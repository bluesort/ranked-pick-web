

export type BodyParams = { [key: string]: any };
export type ResponseObject = { [key: string]: any };

export interface CurrentUser {
	id: number;
	email: string;
	displayName: string | null;
}
interface TokenResponse {
	token: string;
	exp: Date;
}
interface RefreshResponse {
	access_token: TokenResponse;
	user: CurrentUser;
}

export const defaultHeaders: { [key: string]: string } = {
	"Accept":"application/json",
	"Content-Type":"application/json",
};

class ApiClient {
	private accessToken: string | null = null;
	private refreshPromise: Promise<RefreshResponse | null> | null = null;

	public async refreshToken() {
		try {
			if (!this.refreshPromise) {
				this.refreshPromise = this.requestRefresh();
			}
			return await this.refreshPromise;
		} catch (err) {
			this.accessToken = null;
			throw 'Could not authenticate';
		} finally {
			this.refreshPromise = null;
		}
	}

	public async get(route: string, params?: { [key: string]: string }) {
		const path = params ? route + '?' + new URLSearchParams(params) : route;
		return this.authenticatedRequest('GET', path);
	}

	public async post(path: string, params?: BodyParams) {
		return this.authenticatedRequest('POST', path, params);
	}

	public async delete(path: string, params?: BodyParams) {
		return this.authenticatedRequest('DELETE', path, params);
	}

	public async put(path: string, params?: BodyParams) {
		return this.authenticatedRequest('PUT', path, params);
	}

	private async requestRefresh(): Promise<RefreshResponse | null> {
		const resp = await fetch('/api/auth/refresh', {
			method: 'POST',
			headers: defaultHeaders,
			credentials: "include",
		});
		const body = await resp.json();
		const token = body?.access_token?.token;
		if (!resp.ok || !token) {
			throw('Failed to fetch token');
		}
		this.accessToken = token;
		return body;
	}

	private async authenticatedRequest(method: string, path: string, bodyParams?: BodyParams): Promise<any> {
		try {
			const headers = {...defaultHeaders};
			if (!this.accessToken) {
				await this.refreshToken();
				if (this.accessToken == null) {
					// Couldn't authenticate, so return early
					return;
				}
			}
			headers['Authorization'] = 'Bearer ' + this.accessToken;
			const resp = await fetch('/api' + path, {
				method: method,
				headers: headers,
				body: bodyParams ? JSON.stringify(bodyParams) : null,
				credentials: "include",
			});
			if (resp.status === 401) {
				// Return early if we can't refresh
				await this.refreshToken();
				return this.accessToken == null ? null : this.authenticatedRequest(method, path, bodyParams);
			}
			let body: any = {};
			try {
				body = await resp.json();
			} catch {
				// TODO: handle non-json responses
			}
			if (!resp.ok) {
				throw(body?.error || 'Unknown error');
			}
			return body;
		} catch (err) {
			console.error('API error', err);
			throw(err);
		}
	}
}

let client: ApiClient;
export function getApiClient() {
	if (client) {
		return client;
	}
	client = new ApiClient();
	return client;
}

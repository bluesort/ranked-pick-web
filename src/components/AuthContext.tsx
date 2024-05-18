import { CurrentUser, BodyParams, ResponseObject, defaultHeaders, getApiClient } from "@/lib/api-client";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

interface Context {
	signedIn: boolean | undefined;
	currentUser: CurrentUser | null | undefined;
	signin: (params: BodyParams) => Promise<Response>;
	signup: (params: BodyParams) => Promise<Response>;
	signout: () => Promise<void>;
}

const api = getApiClient();
const AuthContext = createContext<Context | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
	const [currentUser, setCurrentUser] = useState<CurrentUser | null>();

	// TODO: Move request and handlers into ApiClient
	const request = useCallback(async (path: string, bodyParams?: BodyParams): Promise<any> => {
		try {
			const resp = await fetch('/api' + path, {
				method: 'POST',
				headers: defaultHeaders,
				body: bodyParams ? JSON.stringify(bodyParams) : null,
				credentials: "include",
			});
			let body: ResponseObject = {};
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
			console.error('Authentication error', err);
			throw(err);
		}
	}, []);

	const signin = useCallback(async (params: BodyParams) => {
		const resp = await request('/auth/signin', params);
		api.refreshToken();
		setCurrentUser({
			id: resp.user.id as number,
			email: resp.user.email as string,
			displayName: resp.user.display_name as string | null,
		});

		return resp;
	}, [request]);

	const signup = useCallback(async (params: BodyParams) => {
		const resp = await request('/auth/signup', params);
		api.refreshToken();
		setCurrentUser({
			id: resp.user.id as number,
			email: resp.user.email as string,
			displayName: resp.user.display_name as string | null,
		});
		return resp;
	}, [request]);

	const signout = useCallback(async () => {
		await request('/auth/signout', undefined);
		setCurrentUser(null);
	}, [request]);

	const fetchCurrentUser = useCallback(async () => {
		try {
			const resp = await api.refreshToken();
			setCurrentUser(resp?.user || null);
		} catch (err) {
			setCurrentUser(null);
		}
	}, []);

	useEffect(() => {
		fetchCurrentUser();
	}, [fetchCurrentUser]);

	return (
		<AuthContext.Provider value={{
			signedIn: currentUser === undefined ? undefined : !!currentUser,
			currentUser,
			signin,
			signup,
			signout,
		}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
}

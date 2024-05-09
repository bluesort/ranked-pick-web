import React, { useContext, useCallback } from 'react';

type Params = { [key: string]: string | boolean };
interface CurrentUser {
	id: number;
	email: string;
	displayName: string | null;
}

interface Context {
	currentUser: CurrentUser | null;
	apiGet: (route: string, params?: Params) => Promise<Response>;
	apiPost: (route: string, params?: Params) => Promise<Response>;
	apiDelete: (route: string, params?: Params) => Promise<Response>;
	signin: (params: Params) => Promise<Response>;
	signup: (params: Params) => Promise<Response>;
	signout: (params: Params) => Promise<Response>;
}

const ApiContext = React.createContext<Context | undefined>(undefined);

export function ApiProvider({children}: {children: React.ReactNode}) {
	const [currentUser, setCurrentUser] = React.useState<CurrentUser | null>(null);
	const [accessToken, setAccessToken] = React.useState<string | null>(null);

	console.log(document.cookie);

	const requestHeaders = useCallback(() => {
		const headers: { [key: string]: string } = {
			"Accept":"application/json",
			"Content-Type":"application/json",
		};
		if (accessToken) {
			headers['Authorization'] = 'Bearer ' + accessToken;
		}
		return headers;
	}, [accessToken]);

	// TODO: dry these up
	const apiGet = useCallback(async (route: string, params?: { [key: string]: string }) => {
		const path = params ? route + '?' + new URLSearchParams(params) : route;
		const resp = await fetch('/api/' + path, {
			method: 'GET',
			headers: requestHeaders(),
		});
		// TODO: refresh token if needed
		const body = await resp.json();
		if (!resp.ok) {
			throw(body || 'Unknown error');
		}
		return resp;
	}, [requestHeaders]);

	const apiPost = useCallback(async (route: string, params?: Params) => {
		const resp = await fetch('/api/' + route, {
			method: 'POST',
			headers: requestHeaders(),
			body: params ? JSON.stringify(params) : null,
		});
		// TODO: refresh token if needed
		const body = await resp.json();
		if (!resp.ok) {
			throw(body || 'Unknown error');
		}
		return resp;
	}, [requestHeaders]);

	const apiDelete = useCallback(async (route: string, params?: Params) => {
		const resp = await fetch('/api/' + route, {
			method: 'DELETE',
			headers: requestHeaders(),
			body: params ? JSON.stringify(params) : null,
		});
		// TODO: refresh token if needed
		const body = await resp.json();
		if (!resp.ok) {
			throw(body || 'Unknown error');
		}
		return resp;
	}, [requestHeaders]);

	const signin = useCallback(async (params: Params) => {
		const resp = await fetch('/api/auth/signin', {
			method: 'POST',
			headers: requestHeaders(),
			body: JSON.stringify(params),
		});
		const body = await resp.json();
		if (!resp.ok) {
			throw(body || 'Unknown error');
		}
		setRefreshCookie(body.refresh_token.token, body.refresh_token.exp);
		setAccessToken(body.access_token.token);
		setCurrentUser({
			id: body.user.id as number,
			email: body.user.email as string,
			displayName: body.user.display_name as string | null,
		});
		return resp;
	}, [requestHeaders]);

	const signup = useCallback(async (params: Params) => {
		const resp = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: requestHeaders(),
			body: JSON.stringify(params),
		});
		const body = await resp.json();
		if (!resp.ok) {
			throw(body || 'Unknown error');
		}
		setRefreshCookie(body.refresh_token.token, body.refresh_token.exp);
		setAccessToken(body.access_token.token);
		setCurrentUser({
			id: body.user.id as number,
			email: body.user.email as string,
			displayName: body.user.display_name as string | null,
		});
		return resp;
	}, [requestHeaders]);

	const signout = useCallback(async (params: Params) => {
		console.log(params);
		// TODO
	}, []);

	return (
		<ApiContext.Provider value={{ currentUser, apiGet, apiPost, apiDelete, signin, signup, signout }}>
			{children}
		</ApiContext.Provider>
	);
}

export function useApi() {
	const context = useContext(ApiContext);
	if (!context) {
		throw new Error('useApi must be used within ApiProvider');
	}
	return context;
}

function setRefreshCookie(token: string, expStr: string) {
	const exp = new Date(expStr);
	document.cookie = "refresh_token=" + token + "; path=/auth/refresh; SameSite=Lax; expires=" + exp.toUTCString();
	console.log("set refresh cookie", "refresh_token=" + token + "; path=/auth/refresh; expires=" + exp.toUTCString());
	console.log(document.cookie);
}

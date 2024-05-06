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
}

const ApiContext = React.createContext<Context | undefined>(undefined);

export function ApiProvider({children}: {children: React.ReactNode}) {
	const [currentUser, setCurrentUser] = React.useState<CurrentUser | null>(null);

	const apiGet = useCallback(async (route: string, params?: { [key: string]: string }) => {
		const path = params ? route + '?' + new URLSearchParams(params) : route;
		const resp = await fetch('/api/' + path, {
			method: 'GET',
			headers: { "Accept":"application/json", "Content-Type":"application/json" },
		});
		const body = await resp.json();
		if (!resp.ok) {
			throw(body || 'Unknown error');
		}
		return resp;
	}, []);

	const apiPost = useCallback(async (route: string, params?: Params) => {
		const resp = await fetch('/api/' + route, {
			method: 'POST',
			headers: { "Accept":"application/json", "Content-Type":"application/json" },
			body: params ? JSON.stringify(params) : null,
		});
		const body = await resp.json();
		if (!resp.ok) {
			throw(body || 'Unknown error');
		}
		return resp;
	}, []);

	const apiDelete = useCallback(async (route: string, params?: Params) => {
		const resp = await fetch('/api/' + route, {
			method: 'DELETE',
			headers: { "Accept":"application/json", "Content-Type":"application/json" },
			body: params ? JSON.stringify(params) : null,
		});
		const body = await resp.json();
		if (!resp.ok) {
			throw(body || 'Unknown error');
		}
		return resp;
	}, []);

	const signin = useCallback(async (params: Params) => {
		const resp = await fetch('/api/signin', {
			method: 'POST',
			headers: { "Accept":"application/json", "Content-Type":"application/json" },
			body: JSON.stringify(params),
		});
		const body = await resp.json();
		if (!resp.ok) {
			throw(body || 'Unknown error');
		}
		// TODO: set jwt cookie
		setCurrentUser({
			id: body.user.id as number,
			email: body.user.email as string,
			displayName: body.user.display_name as string | null,
		});
		return resp;
	}, []);

	const signup = useCallback(async (params: Params) => {
		const resp = await fetch('/api/signup', {
			method: 'POST',
			headers: { "Accept":"application/json", "Content-Type":"application/json" },
			body: JSON.stringify(params),
		});
		const body = await resp.json();
		if (!resp.ok) {
			throw(body || 'Unknown error');
		}
		// TODO: set jwt cookie
		setCurrentUser({
			id: body.user.id as number,
			email: body.user.email as string,
			displayName: body.user.display_name as string | null,
		});
		return resp;
	}, []);

	return (
		<ApiContext.Provider value={{ currentUser, apiGet, apiPost, apiDelete, signin, signup }}>
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

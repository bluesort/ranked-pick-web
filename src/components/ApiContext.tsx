import React, { useContext, useCallback } from 'react';

interface CurrentUser {
	id: number;
}

interface Context {
	currentUser: CurrentUser | null;
	apiGet: (route: string, params?: { [key: string]: string }) => Promise<Response>;
	apiPost: (route: string, params?: { [key: string]: string }) => Promise<Response>;
	apiDelete: (route: string, params?: { [key: string]: string }) => Promise<Response>;
	signin: (params: { [key: string]: string }) => Promise<Response>;
	signup: (params: { [key: string]: string }) => Promise<Response>;
}

const ApiContext = React.createContext<Context | undefined>(undefined);

export function ApiProvider({children}: {children: React.ReactNode}) {
	const [currentUser, setCurrentUser] = React.useState<CurrentUser | null>(null);

	const apiGet = useCallback(async (route: string, params?: { [key: string]: string }) => {
		const path = params ? route + '?' + new URLSearchParams(params) : route;
		return fetch('/api/' + path, {
			method: 'GET',
			headers: { "Accept":"application/json", "Content-Type":"application/json" },
		});
	}, []);

	const apiPost = useCallback(async (route: string, params?: { [key: string]: string }) => {
		return fetch('/api/' + route, {
			method: 'POST',
			headers: { "Accept":"application/json", "Content-Type":"application/json" },
			body: params ? JSON.stringify(params) : null,
		});
	}, []);

	const apiDelete = useCallback(async (route: string, params?: { [key: string]: string }) => {
		return fetch('/api/' + route, {
			method: 'DELETE',
			headers: { "Accept":"application/json", "Content-Type":"application/json" },
			body: params ? JSON.stringify(params) : null,
		});
	}, []);

	const signin = useCallback(async (params: { [key: string]: string }) => {
		const resp = await fetch('/api/signin', {
			method: 'POST',
			headers: { "Accept":"application/json", "Content-Type":"application/json" },
			body: JSON.stringify(params),
		});
		const body = await resp.json();
		if (resp.ok && body?.user) {
			setCurrentUser(body.user);
		} else {
			throw(body);
		}
		return resp;
	}, []);

	const signup = useCallback(async (params: { [key: string]: string }) => {
		return fetch('/api/signup', {
			method: 'POST',
			headers: { "Accept":"application/json", "Content-Type":"application/json" },
			body: JSON.stringify(params),
		}).then(async (resp: Response) => {
			const respJson = await resp.json();
			setCurrentUser(respJson.user);
			return resp;
		});
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

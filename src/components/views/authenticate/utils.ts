
export function authenticatePath(returnTo: string) {
	const redirectTo = returnTo == '/authenticate' ? '/' : returnTo;
	return '/authenticate?' + new URLSearchParams({return_to: redirectTo}).toString();
}


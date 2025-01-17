export type Fetch = {
	(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
	(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
};

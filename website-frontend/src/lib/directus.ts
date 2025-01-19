import { createDirectus, rest, staticToken } from '@directus/sdk';
import { STATIC_ACCESS_TOKEN } from '$env/static/private';
import { PUBLIC_APIURL } from '$env/static/public';
import { type Schema } from './models/schema';
import type { Fetch } from './fetch';

function getDirectusInstance(fetch: Fetch | null) {
	const options = fetch ? { globals: { fetch } } : {};
	const directus = createDirectus<Schema>(PUBLIC_APIURL, options)
		.with(staticToken(STATIC_ACCESS_TOKEN))
		.with(rest());
	return directus;
}

export default getDirectusInstance;

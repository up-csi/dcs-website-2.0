import { createDirectus, rest, authentication } from '@directus/sdk';
import { EMAIL, PASSWORD } from '$env/static/private';
import { PUBLIC_APIURL } from '$env/static/public';
import { type Schema } from './models/schema';
import type { Fetch } from './fetch';

async function getDirectusInstance(fetch: Fetch | null) {
	const options = fetch ? { globals: { fetch } } : {};
	const directus = createDirectus<Schema>(PUBLIC_APIURL, options)
		.with(authentication('session'))
		.with(rest());
	await directus.login(EMAIL, PASSWORD);
	return directus;
}

export default getDirectusInstance;

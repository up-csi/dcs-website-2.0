import { createDirectus, rest } from '@directus/sdk';
import { PUBLIC_APIURL } from '$env/static/public';
import { type Schema } from './models/schema';

function getDirectusInstance(fetch) {
	const options = fetch ? { globals: { fetch } } : {};
	const directus = createDirectus<Schema>(PUBLIC_APIURL, options).with(rest());
	return directus;
}

export default getDirectusInstance;

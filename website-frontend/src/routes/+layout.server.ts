/** @type {import('./$types').LayoutServerLoad} */
import { PUBLIC_APIURL } from '$env/static/public';
import getDirectusInstance from '$lib/directus';
import obtainSchema from '$lib/server/schema';
import obtainAssets from '$lib/server/assets';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);

	const keys = ['global'];
	const schema = await obtainSchema(directus, keys);

	const asset_urls = {
		favicon: `${PUBLIC_APIURL}/assets/${schema.global.favicon}`
	};
	const assets = await obtainAssets(asset_urls);

	return { schema, assets };
}

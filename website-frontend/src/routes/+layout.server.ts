/** @type {import('./$types').LayoutServerLoad} */
import getDirectusInstance from '$lib/directus';
import directusFetch from '$lib/server/fetch';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const global = await directusFetch(directus, 'global');

	return { global };
}

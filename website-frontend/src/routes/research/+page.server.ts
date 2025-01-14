/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import directusFetch from '$lib/server/fetch.js';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const laboratories = await directusFetch(directus, 'laboratories');

	return { laboratories };
}

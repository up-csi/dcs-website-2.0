/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import directusFetch from '$lib/server/fetch';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const global = await directusFetch(directus, 'global');
	const events = await directusFetch(directus, 'events');

	return { global, events };
}

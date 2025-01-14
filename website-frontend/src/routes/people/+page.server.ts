/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import directusFetch from '$lib/server/fetch';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const people = await directusFetch(directus, 'people');
	const people_overview = await directusFetch(directus, 'people_overview');

	return { people, people_overview };
}

/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import directusFetch from '$lib/server/fetch';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const students_overview = await directusFetch(directus, 'students_overview');

	return { students_overview };
}

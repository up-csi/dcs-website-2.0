/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const people = await directus.request(readItems('people'));
	const people_overview = await directus.request(readSingleton('people_overview'));

	return { people, people_overview };
}

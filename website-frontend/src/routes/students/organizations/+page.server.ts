/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const students_organizations = await directus.request(readItems('students_organizations'));
	const students_organizations_overview = await directus.request(
		readSingleton('students_organizations_overview')
	);

	return { students_organizations, students_organizations_overview };
}

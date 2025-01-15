/** @type {import('./$types').PageServerLoad} */
import { readItem } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const page = await directus.request(readItem('students_pages', 4));

	return {
		page
	};
}

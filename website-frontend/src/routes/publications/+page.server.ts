/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const publications = await directus.request(
		readItems('publications', {
			sort: '-publish_date'
		})
	);
	return { publications };
}

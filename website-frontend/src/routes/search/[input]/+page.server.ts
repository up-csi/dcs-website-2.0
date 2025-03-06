/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch, params }) {
	const directus = getDirectusInstance(fetch);
	const events = await directus.request(
		readItems('events', {
			search: params.input
		})
	);
	const people = await directus.request(
		readItems('people', {
			search: params.input
		})
	);
	const laboratories = await directus.request(
		readItems('laboratories', {
			search: params.input
		})
	);
	const publications = await directus.request(
		readItems('publications', {
			search: params.input
		})
	);

	return {
		events,
		people,
		laboratories,
		publications
	};
}

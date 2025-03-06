/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const events = await directus.request(
		readItems('events', {
			search: url.searchParams.get('q') ?? undefined
		})
	);
	const people = await directus.request(
		readItems('people', {
			search: url.searchParams.get('q') ?? undefined
		})
	);
	const laboratories = await directus.request(
		readItems('laboratories', {
			search: url.searchParams.get('q') ?? undefined
		})
	);
	const publications = await directus.request(
		readItems('publications', {
			search: url.searchParams.get('q') ?? undefined
		})
	);

	return {
		events,
		people,
		laboratories,
		publications
	};
}

/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const filters = {
		positions: url.searchParams.getAll('position')
	};

	const allPositions = await directus.request(
		readItems('people', {
			fields: ['position']
		})
	);

	const position_filters = [...new Set(allPositions.map((p) => p.position))].sort();

	let filter = {};
	if (filters.positions.length > 0) {
		filter = {
			position: { _in: filters.positions }
		};
	}

	const people = await directus.request(
		readItems('people', {
			fields: ['*', 'position', 'affiliations.laboratories_id.name'],
			filter
		})
	);

	const people_overview = await directus.request(readSingleton('people_overview', {}));

	return {
		people,
		people_overview,
		position_filters
	};
}

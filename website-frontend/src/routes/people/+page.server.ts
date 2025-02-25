/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const filters = {
		positions: url.searchParams.getAll('position'),
		laboratories: url.searchParams.getAll('laboratory')
	};

	const allPositions = await directus.request(
		readItems('people', {
			fields: ['position']
		})
	);

	const allLaboratories = await directus.request(
		readItems('people', {
			fields: [
				{
					affiliations: [
						{
							laboratories_id: ['name']
						}
					]
				}
			]
		})
	);

	const position_filters = [...new Set(allPositions.map((p) => p.position))].sort();
	const laboratory_filters = [
		...new Set(
			allLaboratories.flatMap((p) => p.affiliations?.map((a) => a.laboratories_id?.name) ?? [])
		)
	]
		.filter(Boolean)
		.sort();

	const people = await directus.request(
		readItems('people', {
			fields: [
				'*',
				'position',
				{
					affiliations: [
						{
							laboratories_id: ['name']
						}
					]
				}
			],
			filter: {
				_and: [
					{
						position: { _in: filters.positions.length !== 0 ? filters.positions : undefined }
					},
					{
						affiliations: {
							laboratories_id: {
								name: { _in: filters.laboratories.length !== 0 ? filters.laboratories : undefined }
							}
						}
					}
				]
			}
		})
	);

	const people_overview = await directus.request(readSingleton('people_overview', {}));

	return {
		people,
		people_overview,
		position_filters,
		laboratory_filters
	};
}

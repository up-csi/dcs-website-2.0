/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);

	const filters = {
		year: url.searchParams.getAll('year'),
		laboratories: url.searchParams.getAll('laboratory'),
		tags: url.searchParams.getAll('laboratory')
	};

	const laboratories_filters = await directus
		.request(
			readItems('laboratories', {
				fields: ['name'],
				sort: ['name']
			})
		)
		.then((res) => res.map(({ name }) => name));

	const publications = await directus.request(
		readItems('publications', {
			filter: {
				laboratory: {
					name: { _in: filters.laboratories.length !== 0 ? filters.laboratories : undefined }
				}
			},
			sort: ['-publish_date']
		})
	);

	return { publications, laboratories_filters };
}

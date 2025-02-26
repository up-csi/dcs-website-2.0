/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const categorySlug = params.slug;
	const filters = {
		positions: url.searchParams.getAll('position'),
		laboratories: url.searchParams.getAll('laboratory')
	};

	const categories = await directus.request(
		readItems('people_categories', {
			filter: {
				title: {
					_eq: categorySlug
				}
			}
		})
	);

	if (!categories.length) {
		throw error(404, 'Category not found');
	}

	const category = categories[0];

	const allPositions = await directus.request(
		readItems('people', {
			fields: ['position'],
			filter: {
				category: {
					_eq: category.title
				}
			}
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
			],
			filter: {
				category: {
					_eq: category.title
				}
			}
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
						category: {
							_eq: category.title
						}
					},
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

	return { category, people, position_filters, laboratory_filters };
}

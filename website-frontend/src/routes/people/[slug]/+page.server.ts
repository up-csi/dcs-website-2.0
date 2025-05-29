/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';
import { parse } from 'valibot';
import { PeopleCategories, PeopleCategory } from '$lib/models/people_categories';
import { People } from '$lib/models/people';

export async function load({ params, fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const categorySlug = params.slug;
	const filters = {
		positions: url.searchParams.getAll('position'),
		laboratories: url.searchParams.getAll('laboratory'),
		levels: url.searchParams.getAll('level')
	};

	const categories = parse(
		PeopleCategories,
		await directus.request(
			readItems('people_categories', {
				filter: {
					title: {
						_eq: categorySlug
					}
				}
			})
		)
	);

	if (!categories.length) {
		throw error(404, 'Category not found');
	}

	const category = parse(PeopleCategory, categories[0]);

	const allPositions = parse(
		People,
		await directus.request(
			readItems('people', {
				fields: ['position'],
				filter: {
					category: {
						_eq: category.title
					}
				}
			})
		)
	);

	const allLaboratories = parse(
		People,
		await directus.request(
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
		)
	);

	const allLevels = await directus.request(
		readItems('people', {
			fields: ['level'],
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
			allLaboratories.flatMap((p) => {
				return (
					(typeof p.affiliations !== 'string'
						? p.affiliations
								?.filter((a) => typeof a !== 'string')
								.map(({ laboratories_id }) => {
									if (typeof laboratories_id !== 'string') return laboratories_id?.name;
								})
						: []) ?? []
				);
			})
		)
	]
		.filter(Boolean)
		.sort();
	const level_filters = [...new Set(allLevels.map((p) => p.level))].filter(Boolean);

	const people = parse(
		People,
		await directus.request(
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
									name: {
										_in: filters.laboratories.length !== 0 ? filters.laboratories : undefined
									}
								}
							}
						},
						{
							level: { _in: filters.levels.length !== 0 ? filters.levels : undefined }
						}
					]
				}
			})
		)
	);

	return { category, people, position_filters, laboratory_filters, level_filters };
}

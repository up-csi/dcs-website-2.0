/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const directus = getDirectusInstance(fetch);

	const academics_categories = await directus.request(
		readItems('academics_categories', {
			filter: {
				slug: {
					_eq: params.category
				}
			},
			limit: 1
		})
	);

	if (!academics_categories || academics_categories.length === 0) {
		throw error(404, 'Category not found');
	}

	const academics_category = academics_categories[0];

	const academics_programs = await directus.request(
		readItems('academics_programs', {
			fields: [
				'*',
				{
					category: ['name', 'slug']
				}
			],
			sort: ['title'],
			filter: {
				category: {
					slug: {
						_eq: params.category
					}
				}
			}
		})
	);

	const academics_pages = await directus.request(
		readItems('academics_pages', {
			fields: ['title', 'slug'],
			filter: {
				category: {
					slug: {
						_eq: params.category
					}
				}
			}
		})
	);

	return { academics_category, academics_programs, academics_pages };
}

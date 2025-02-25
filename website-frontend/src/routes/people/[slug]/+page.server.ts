/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const categorySlug = params.slug;

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

	const people = await directus.request(
		readItems('people', {
			filter: {
				category: {
					_eq: category.title
				}
			}
		})
	);
	return { category, people };
}

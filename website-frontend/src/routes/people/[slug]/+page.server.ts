import { readItems } from '@directus/sdk';
import { parse } from 'valibot';
import { People } from '$lib/models/people';
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

	const people = parse(
		People,
		await directus.request(
			readItems('people', {
				filter: {
					category: {
						_eq: category.title
					}
				}
			})
		)
	);

	return {
		category,
		people
	};
}

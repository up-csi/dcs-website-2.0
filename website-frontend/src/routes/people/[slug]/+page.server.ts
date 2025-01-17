/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import directusFetch from '$lib/server/fetch';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = await getDirectusInstance(fetch);
	const category = await directusFetch(directus, 'people_categories', {
		filter: {
			title: {
				_eq: params.slug
			}
		}
	})
		.then((res) => res[0])
		.catch(() => {
			throw error(404, 'Category not found');
		});
	const people = await directusFetch(directus, 'people');

	return { category, people };
}

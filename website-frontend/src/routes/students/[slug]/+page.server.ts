/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import directusFetch from '$lib/server/fetch';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = await getDirectusInstance(fetch);
	const students_page = await directusFetch(directus, 'students_pages', {
		filter: {
			slug: {
				_eq: params.slug
			}
		}
	})
		.then((res) => res[0])
		.catch(() => {
			throw error(404, 'Page not found');
		});

	return { students_page };
}

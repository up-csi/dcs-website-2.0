/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import directusFetch from '$lib/server/fetch';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const directus = await getDirectusInstance(fetch);
	const about_page = await directusFetch(directus, 'about_pages', {
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

	return { about_page };
}

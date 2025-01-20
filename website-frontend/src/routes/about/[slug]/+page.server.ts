/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const slug = params.slug;

	const pages = await directus.request(
		readItems('about_pages', {
			filter: {
				slug: {
					_eq: slug
				}
			}
		})
	);

	if (!pages.length) {
		throw error(404, 'Page not found');
	}

	const page = pages[0];

	return {
		page
	};
}

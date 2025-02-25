/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const directus = getDirectusInstance(fetch);
	const academics_pages = await directus.request(
		readItems('academics_pages', {
			filter: {
				category: {
					slug: {
						_eq: params.category
					}
				},
				slug: {
					_eq: params.slug
				}
			},
			limit: 1
		})
	);

	if (!academics_pages || academics_pages.length === 0) {
		throw error(404, 'Page not found');
	}

	const academics_page = academics_pages[0];

	return { academics_page };
}

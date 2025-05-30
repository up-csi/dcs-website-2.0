/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';
import { parse } from 'valibot';
import { AcademicsPage, AcademicsPages } from '$lib/models/academics_pages';

export async function load({ fetch, params }) {
	const directus = getDirectusInstance(fetch);
	const academics_pages = parse(
		AcademicsPages,
		await directus.request(
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
		)
	);

	if (!academics_pages || academics_pages.length === 0) {
		throw error(404, 'Page not found');
	}

	const academics_page = parse(AcademicsPage, academics_pages[0]);

	return { academics_page };
}

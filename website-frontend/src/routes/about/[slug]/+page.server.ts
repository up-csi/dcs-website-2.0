/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { AboutPage, AboutPages } from '$lib/models/about_pages';
import { error } from '@sveltejs/kit';
import { parse } from 'valibot';

export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const slug = params.slug;

	const pages = parse(
		AboutPages,
		await directus.request(
			readItems('about_pages', {
				filter: {
					slug: {
						_eq: slug
					}
				}
			})
		)
	);

	if (!pages.length) {
		throw error(404, 'Page not found');
	}

	const page = parse(AboutPage, pages[0]);

	return { page };
}

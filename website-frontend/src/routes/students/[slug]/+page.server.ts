/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';
import { parse } from 'valibot';
import { StudentsPage, StudentsPages } from '$lib/models/students_pages';

export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const slug = params.slug;

	const pages = parse(
		StudentsPages,
		await directus.request(
			readItems('students_pages', {
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

	const page = parse(StudentsPage, pages[0]);

	return {
		page
	};
}

/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { readItems, readSingleton } from '@directus/sdk';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const academics = await directus.request(readSingleton('academics'));
	const academics_categories = await directus.request(
		readItems('academics_categories', {
			fields: ['name', 'slug', 'description']
		})
	);
	const academics_programs = await directus.request(
		readItems('academics_programs', {
			fields: [
				'*',
				{
					category: ['name', 'slug']
				}
			],
			sort: ['title']
		})
	);
	const academics_courses = await directus.request(
		readItems('academics_courses', {
			sort: ['course_code']
		})
	);

	return { academics, academics_categories, academics_programs, academics_courses };
}

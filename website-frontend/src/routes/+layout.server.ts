/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const global = await directus.request(readSingleton('global'));

	const about_pages = await directus.request(
		readItems('about_pages', {
			fields: ['title', 'slug']
		})
	);
	const people_categories = await directus.request(
		readItems('people_categories', {
			fields: ['title']
		})
	);
	const academics_categories = await directus.request(
		readItems('academics_categories', {
			fields: ['name', 'slug']
		})
	);
	const academics_programs = await directus.request(
		readItems('academics_programs', {
			fields: [
				'title',
				'slug',
				{
					category: ['slug']
				}
			]
		})
	);
	const academics_pages = await directus.request(
		readItems('academics_pages', {
			fields: [
				'title',
				'slug',
				{
					category: ['slug']
				}
			]
		})
	);
	const laboratories = await directus.request(
		readItems('laboratories', {
			fields: ['name', 'slug']
		})
	);
	const students_pages = await directus.request(
		readItems('students_pages', {
			fields: ['title', 'slug']
		})
	);

	return {
		global,
		about_pages,
		people_categories,
		academics_categories,
		academics_programs,
		academics_pages,
		laboratories,
		students_pages
	};
}

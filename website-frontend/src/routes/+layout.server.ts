/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { parse } from 'valibot';
import { Global } from '$lib/models/global';
import { AboutPages } from '$lib/models/about_pages';
import { PeopleCategories } from '$lib/models/people_categories';
import { AcademicsCategories } from '$lib/models/academics_categories';
import { AcademicsPrograms } from '$lib/models/academics_programs';
import { AcademicsPages } from '$lib/models/academics_pages';
import { Laboratories } from '$lib/models/laboratories';
import { StudentsPages } from '$lib/models/students_pages';
import { MiscellaneousPages } from '$lib/models/miscellaneous_pages.js';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const global = parse(Global, await directus.request(readSingleton('global')));

	const about_pages = parse(
		AboutPages,
		await directus.request(
			readItems('about_pages', {
				fields: ['title', 'slug']
			})
		)
	);
	const people_categories = parse(
		PeopleCategories,
		await directus.request(
			readItems('people_categories', {
				fields: ['title']
			})
		)
	);
	const academics_categories = parse(
		AcademicsCategories,
		await directus.request(
			readItems('academics_categories', {
				fields: ['name', 'slug']
			})
		)
	);
	const academics_programs = parse(
		AcademicsPrograms,
		await directus.request(
			readItems('academics_programs', {
				fields: [
					'title',
					'slug',
					{
						category: ['slug']
					}
				]
			})
		)
	);
	const academics_pages = parse(
		AcademicsPages,
		await directus.request(
			readItems('academics_pages', {
				fields: [
					'title',
					'slug',
					{
						category: ['slug']
					}
				]
			})
		)
	);
	const laboratories = parse(
		Laboratories,
		await directus.request(
			readItems('laboratories', {
				fields: ['name', 'slug']
			})
		)
	);
	const students_pages = parse(
		StudentsPages,
		await directus.request(
			readItems('students_pages', {
				fields: ['title', 'slug']
			})
		)
	);

	const miscellaneous_pages = parse(
		MiscellaneousPages,
		await directus.request(
			readItems('miscellaneous_pages', {
				fields: ['title', 'slug', 'is_on_nav']
			})
		)
	);

	return {
		global,
		about_pages,
		people_categories,
		academics_categories,
		academics_programs,
		academics_pages,
		laboratories,
		miscellaneous_pages,
		students_pages
	};
}

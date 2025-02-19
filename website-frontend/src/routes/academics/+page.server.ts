/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { Academics } from '$lib/models/academics';
import { AcademicsCourses } from '$lib/models/academics_courses';
import { AcademicsPrograms } from '$lib/models/academics_programs';
import { readItems, readSingleton } from '@directus/sdk';
import { parse } from 'valibot';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const academics = parse(Academics, await directus.request(readSingleton('academics')));
	const academics_programs = parse(
		AcademicsPrograms,
		await directus.request(
			readItems('academics_programs', {
				fields: ['*', 'category.name', 'category.slug'],
				sort: ['title']
			})
		)
	);
	const academics_courses = parse(
		AcademicsCourses,
		await directus.request(
			readItems('academics_courses', {
				sort: ['course_code']
			})
		)
	);

	return { academics, academics_programs, academics_courses };
}

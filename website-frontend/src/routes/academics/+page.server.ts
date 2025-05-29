/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import { parse } from 'valibot';
import { Academics } from '$lib/models/academics';
import { AcademicsCategories } from '$lib/models/academics_categories';
import { AcademicsPrograms } from '$lib/models/academics_programs';
import { AcademicsCourses } from '$lib/models/academics_courses';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const academics = parse(Academics, await directus.request(readSingleton('academics')));
	const academics_categories = parse(
		AcademicsCategories,
		await directus.request(
			readItems('academics_categories', {
				fields: ['name', 'slug', 'description']
			})
		)
	);
	const academics_programs = parse(
		AcademicsPrograms,
		await directus.request(
			readItems('academics_programs', {
				fields: [
					'*',
					{
						category: ['name', 'slug']
					}
				],
				sort: ['title']
			})
		)
	);
	const academics_courses = parse(
		AcademicsCourses,
		await directus.request(
			readItems('academics_courses', {
				search: url.searchParams.get('q') ?? '',
				sort: ['course_code']
			})
		)
	);
	const curriculum_last_updated = (() => {
		const dates = academics_programs.map(
			(program) => new Date(program.curriculum_last_updated ?? 0)
		);
		return new Date(Math.max(...dates.map((date) => date.getTime())));
	})();

	return {
		academics,
		academics_categories,
		academics_programs,
		academics_courses,
		curriculum_last_updated
	};
}

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
		await directus
			.request(
				readItems('academics_courses', {
					fields: [
						'*',
						{
							course_prerequisites: ['course_prerequisite']
						},
						{
							course_corequisites: ['course_corequisite']
						}
					],
					search: url.searchParams.get('q') ?? '',
					sort: ['course_code']
				})
			)
			.then((res) =>
				res.sort((a, b) => {
					const [a_key, a_num] = a.course_code ? a.course_code.split(' ') : ['', ''];
					const [b_key, b_num] = b.course_code ? b.course_code.split(' ') : ['', ''];

					// Compare the course primary keys alphabetically
					if (a_key < b_key) return -1;
					if (a_key > b_key) return 1;

					// Compare the course numbers numerically if the course primary keys are equal
					return parseInt(a_num, 10) - parseInt(b_num, 10);
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

/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';
import { parse } from 'valibot';
import { AcademicsCategories, AcademicsCategory } from '$lib/models/academics_categories';
import { AcademicsCourses } from '$lib/models/academics_courses';
import { AcademicsPrograms } from '$lib/models/academics_programs';

export async function load({ fetch, params, url }) {
	const directus = getDirectusInstance(fetch);

	const academics_categories = parse(
		AcademicsCategories,
		await directus.request(
			readItems('academics_categories', {
				filter: {
					slug: {
						_eq: params.category
					}
				},
				limit: 1
			})
		)
	);

	if (!academics_categories || academics_categories.length === 0) {
		throw error(404, 'Category not found');
	}

	const academics_category = parse(AcademicsCategory, academics_categories[0]);

	const academics_courses = parse(
		AcademicsCourses,
		await directus.request(
			readItems('academics_courses', {
				search: url.searchParams.get('q') ?? '',
				sort: ['course_code'],
				filter: {
					related_academics_programs: {
						academics_programs_id: {
							category: {
								slug: {
									_eq: params.category
								}
							}
						}
					}
				}
			})
		)
	);

	const curriculum_last_updated = await (async () => {
		const academics_programs = parse(
			AcademicsPrograms,
			await directus.request(
				readItems('academics_programs', {
					filter: {
						category: {
							slug: {
								_eq: params.category
							}
						}
					},
					fields: ['curriculum_last_updated']
				})
			)
		);
		const dates = academics_programs.map(
			(program) => new Date(program.curriculum_last_updated ?? 0)
		);
		return new Date(Math.max(...dates.map((date) => date.getTime())));
	})();

	return { academics_category, academics_courses, curriculum_last_updated };
}

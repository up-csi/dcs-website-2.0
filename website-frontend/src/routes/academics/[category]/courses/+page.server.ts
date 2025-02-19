/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { AcademicsCategories, AcademicsCategory } from '$lib/models/academics_categories';
import { AcademicsCourses } from '$lib/models/academics_courses';
import { readItems } from '@directus/sdk';
import { parse } from 'valibot';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
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

	return { academics_category, academics_courses };
}

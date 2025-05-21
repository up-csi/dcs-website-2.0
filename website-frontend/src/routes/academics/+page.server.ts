/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { readItems, readSingleton } from '@directus/sdk';

export async function load({ fetch, url }) {
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
			search: url.searchParams.get('q') ?? '',
			sort: ['course_code']
		})
	);
	const curriculum_last_updated = (() => {
		const dates = academics_programs.map((program) => new Date(program.curriculum_last_updated));
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

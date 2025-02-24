/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { AcademicsProgram, AcademicsPrograms } from '$lib/models/academics_programs';
import { readItems } from '@directus/sdk';
import { parse } from 'valibot';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const directus = getDirectusInstance(fetch);
	const academics_programs = parse(
		AcademicsPrograms,
		await directus.request(
			readItems('academics_programs', {
				fields: [
					'*',
					{
						curriculum_table: ['*']
					}
				],
				filter: {
					category: {
						slug: {
							_eq: params.category
						}
					},
					slug: {
						_eq: params.slug
					}
				},
				limit: 1
			})
		)
	);

	if (!academics_programs || academics_programs.length === 0) {
		throw error(404, 'Program not found');
	}

	const academics_program = parse(AcademicsProgram, academics_programs[0]);

	return { academics_program };
}

/** @type {import('./$types').PageServerLoad} */
import { readSingleton } from '@directus/sdk';
import { parse } from 'valibot';
import { StudentsOverview } from '$lib/models/students_overview.js';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	return {
		students_overview: parse(
			StudentsOverview,
			await directus.request(readSingleton('students_overview'))
		)
	};
}

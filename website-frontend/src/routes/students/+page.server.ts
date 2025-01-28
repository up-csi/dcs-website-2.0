/** @type {import('./$types').PageServerLoad} */
import { readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { StudentsOverview } from '$lib/models/students_overview';
import { parse } from 'valibot';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const students_overview = parse(
		StudentsOverview,
		await directus.request(readSingleton('students_overview'))
	);

	return { students_overview };
}

/** @type {import('./$types').PageServerLoad} */
import { readItem } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { StudentsPage } from '$lib/models/students_pages';
import { parse } from 'valibot';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const page = parse(StudentsPage, await directus.request(readItem('students_pages', 4)));

	return { page };
}

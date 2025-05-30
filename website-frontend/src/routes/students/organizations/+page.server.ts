/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { parse } from 'valibot';
import { StudentsOrganizations } from '$lib/models/students_organizations';
import { StudentsOrganizationsOverview } from '$lib/models/students_organizations_overview';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	const students_organizations = parse(
		StudentsOrganizations,
		await directus.request(readItems('students_organizations'))
	);
	const students_organizations_overview = parse(
		StudentsOrganizationsOverview,
		await directus.request(readSingleton('students_organizations_overview'))
	);

	return { students_organizations, students_organizations_overview };
}

/** @type {import('./$types').PageServerLoad} */
import type { StudentsOrganization } from '$lib/models/students_organizations.js';
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const organizationSlug = params.slug;

	const organizations = await directus.request(
		readItems('students_organizations', {
			filter: {
				slug: {
					_eq: organizationSlug
				}
			},
			fields: [
				'*',
				{
					background_images: [
						{
							directus_files_id: ['id']
						}
					]
				}
			]
		})
	);

	const organization = organizations[0] as StudentsOrganization;

	if (!organizations || organizations.length === 0) {
		throw error(404, 'Organization not found');
	}

	return { organization };
}

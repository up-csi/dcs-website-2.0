/** @type {import('./$types').PageServerLoad} */
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
			fields: ['*', 'background_images.directus_files_id.*']
		})
	);

	if (!organizations.length) {
		throw error(404, 'Organization not found');
	}

	const organization = organizations[0];

	return {
		organization
	};
}

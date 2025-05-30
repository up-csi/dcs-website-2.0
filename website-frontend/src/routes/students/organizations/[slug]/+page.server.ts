/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';
import { parse } from 'valibot';
import { StudentsOrganizations, StudentsOrganization } from '$lib/models/students_organizations';
import { Events } from '$lib/models/event';
import { News } from '$lib/models/news';

export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const organizationSlug = params.slug;

	const organizations = parse(
		StudentsOrganizations,
		await directus.request(
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
		)
	);

	const organization = parse(StudentsOrganization, organizations[0]);

	if (!organizations || organizations.length === 0) {
		throw error(404, 'Organization not found');
	}

	const events = parse(Events, await directus.request(readItems('events')));
	const news = parse(News, await directus.request(readItems('news')));

	return { organization, events, news };
}

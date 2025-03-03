/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const username = params.username;

	const people = await directus.request(
		readItems('people', {
			filter: {
				username: { _eq: username }
			},
			fields: [
				'*',
				{
					affiliations: [
						'role',
						{
							laboratories_id: ['name']
						}
					]
				},
				{
					publications: [
						{
							publications_id: [
								'id',
								'title',
								'publish_date',
								'authors',
								'hero_image',
								'abstract',
								'access_links',
								{
									linked_authors: [
										{
											people_id: ['first_name', 'last_name', 'username', 'category']
										}
									]
								}
							]
						}
					]
				}
			],
			limit: 1
		})
	);

	if (!people || people.length === 0) {
		throw error(404, 'Person not found');
	}

	const person = people[0];

	return { person };
}

/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { People, Person } from '$lib/models/people';
import { PeopleLaboratories } from '$lib/models/people_laboratories';
import { Laboratories } from '$lib/models/laboratories';
import { parse } from 'valibot';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const username = params.username;

	const people = parse(
		People,
		await directus.request(
			readItems('people', {
				filter: {
					username: { _eq: username }
				},
				limit: 1
			})
		)
	);

	if (!people || people.length === 0) {
		throw error(404, 'Person not found');
	}

	const personId = people[0].id;

	const labAssociations = parse(
		PeopleLaboratories,
		await directus.request(
			readItems('people_laboratories', {
				filter: {
					people_id: { _eq: personId }
				}
			})
		)
	);

	const laboratoryIds = labAssociations.map((assoc) => assoc.laboratories_id);
	const laboratories =
		laboratoryIds.length > 0
			? parse(
					Laboratories,
					await directus.request(
						readItems('laboratories', {
							filter: {
								id: { _in: laboratoryIds }
							}
						})
					)
				)
			: [];

	const person = parse(Person, people[0]);

	return { person, laboratories };
}

/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import { parse } from 'valibot';
import { Person } from '$lib/models/people';
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
			limit: 1
		})
	);

	if (!people || people.length === 0) {
		throw error(404, 'Person not found');
	}

	const personId = people[0].id;

	const labAssociations = await directus.request(
		readItems('people_laboratories', {
			filter: {
				people_id: { _eq: personId }
			}
		})
	);

	const laboratoryIds = labAssociations.map((assoc) => assoc.laboratories_id);
	const laboratories =
		laboratoryIds.length > 0
			? await directus.request(
					readItems('laboratories', {
						filter: {
							id: { _in: laboratoryIds }
						}
					})
				)
			: [];

	return {
		person: parse(Person, people[0]),
		laboratories
	};
}

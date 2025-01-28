/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { People } from '$lib/models/people';
import { PeopleOverview } from '$lib/models/people_overview';
import { parse } from 'valibot';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const people = parse(People, await directus.request(readItems('people')));
	const people_overview = parse(
		PeopleOverview,
		await directus.request(readSingleton('people_overview'))
	);

	return { people, people_overview };
}

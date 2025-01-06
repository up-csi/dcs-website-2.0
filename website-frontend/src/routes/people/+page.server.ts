import { readItems, readSingleton } from '@directus/sdk';
import { parse } from 'valibot';
import { People } from '$lib/models/people';
import { PeopleOverview } from '$lib/models/people_overview';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	return {
		people: parse(People, await directus.request(readItems('people'))),
		people_overview: parse(PeopleOverview, await directus.request(readSingleton('people_overview')))
	};
}

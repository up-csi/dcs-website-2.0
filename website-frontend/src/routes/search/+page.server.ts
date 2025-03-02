/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
// import { parse } from 'valibot';
// import { Events } from '$lib/models/event';
// import { People } from '$lib/models/people';
// import { Laboratories } from '$lib/models/laboratories';
// import { Publications } from '$lib/models/publications';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	return {
		events: await directus.request(readItems('events')),
		people: await directus.request(readItems('people')),
		laboratories: await directus.request(readItems('laboratories')),
		publications: await directus.request(readItems('publications')),
	};
}

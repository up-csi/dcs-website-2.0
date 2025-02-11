/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const global = await directus.request(readSingleton('global'));
	const events = await directus.request(
		readItems('events', { fields: ['*', 'event_area.name', 'event_tags.events_tags_id.name'] })
	);

	return { global, events };
}

/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = await getDirectusInstance(fetch);
	const eventSlug = params.slug;

	const events = await directus.request(
		readItems('events', {
			filter: {
				event_headline: {
					_eq: eventSlug
				}
			}
		})
	);

	if (!events.length) {
		throw error(404, 'Event not found');
	}

	const our_event = events[0];

	return {
		our_event,
	};
}

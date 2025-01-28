/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { Events } from '$lib/models/event';
import { error } from '@sveltejs/kit';
import { parse } from 'valibot';

export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const eventSlug = params.slug;

	const events = parse(
		Events,
		await directus.request(
			readItems('events', {
				filter: {
					slug: {
						_eq: eventSlug
					}
				}
			})
		)
	);

	if (!events.length) {
		throw error(404, 'Event not found');
	}

	const event = events[0];

	return {
		event
	};
}

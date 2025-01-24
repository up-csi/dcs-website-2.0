/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';
import { Events } from '$lib/models/event';
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

	const related_events = await (async () => {
		if (event.tags) {
			return parse(
				Events,
				await directus
					.request(
						readItems('events', {
							filter: {
								id: {
									_neq: event.id
								}
							}
						})
					)
					.then((res) =>
						res.filter((item) => {
							const item_tags = new Set(item.tags);
							const event_tags = new Set(event.tags);
							return item_tags.intersection(event_tags).size !== 0;
						})
					)
			);
		}
		return [];
	})();

	return { event, related_events };
}

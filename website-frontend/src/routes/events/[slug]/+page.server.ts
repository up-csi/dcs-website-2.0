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
				fields: [
					'*',
					'event_area.name',
					'event_tags.events_tags_id.name',
					'event_tags.events_tags_id.related_events.events_id.*',
					'event_tags.events_tags_id.related_events.events_id.event_area.name',
					'event_tags.events_tags_id.related_events.events_id.event_tags.events_tags_id.name'
				],
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
	const event_tags = event.event_tags
		.map((item) => {
			if (typeof item === 'string') return [];
			if (typeof item.events_tags_id === 'string') return [];
			return item.events_tags_id.related_events ?? [];
		})
		.flat();

	const related_events = (() => {
		if (event.event_tags.length != 0) {
			return event_tags
				.filter((item) => typeof item !== 'string')
				.filter(
					({ events_id }, index) =>
						events_id.id != event.id &&
						!event_tags
							.filter((item) => typeof item !== 'string')
							.map(({ events_id }) => events_id.id)
							.includes(events_id.id, index + 1)
				)
				.map((res) => res.events_id);
		}
		return [];
	})();

	return { event, related_events };
}

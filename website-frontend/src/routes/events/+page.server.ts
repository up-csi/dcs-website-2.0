/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';
import { parse } from 'valibot';
import { EventsAreas } from '$lib/models/events_areas';
import { EventsTags } from '$lib/models/events_tags';
import { Events } from '$lib/models/event';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const filters = {
		locations: url.searchParams.getAll('location'),
		disciplines: url.searchParams.getAll('discipline')
	};
	const location_filters = parse(
		EventsAreas,
		await directus.request(
			readItems('events_areas', {
				fields: ['name'],
				sort: ['order']
			})
		)
	).map(({ name }) => name);
	const discipline_filters = parse(
		EventsTags,
		await directus.request(
			readItems('events_tags', {
				fields: ['name'],
				filter: {
					tag_category: {
						name: {
							_eq: 'discipline'
						}
					}
				},
				sort: ['name']
			})
		)
	).map(({ name }) => name);
	const events = parse(
		Events,
		await directus.request(
			readItems('events', {
				fields: [
					'*',
					{
						event_area: ['name']
					},
					{
						event_tags: [
							{
								events_tags_id: ['name']
							}
						]
					}
				],
				filter: {
					_and: [
						{
							event_area: {
								name: { _in: filters.locations.length !== 0 ? filters.locations : undefined }
							}
						},
						{
							event_tags: {
								events_tags_id: {
									name: {
										_in: filters.disciplines.length !== 0 ? filters.disciplines : undefined
									}
								}
							}
						}
					]
				}
			})
		)
	);

	return { events, location_filters, discipline_filters };
}

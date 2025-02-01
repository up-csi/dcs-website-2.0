/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { Events } from '$lib/models/event';
import { readItems } from '@directus/sdk';
import { parse } from 'valibot';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const filters = {
		locations: url.searchParams.getAll('location'),
		disciplines: url.searchParams.getAll('discipline'),
		time: url.searchParams.get('time')
	};
	const locations = await directus
		.request(
			readItems('events_areas', {
				filter: {
					name: { _in: filters.locations.length !== 0 ? filters.locations : undefined }
				}
			})
		)
		.then((res) => res.map((res) => res.id));
	const events = await (async () => {
		if (filters.time === 'past') {
			return parse(
				Events,
				await directus.request(
					readItems('events', {
						fields: ['*', 'event_tags.events_tags_id.name'],
						filter: {
							_and: [
								{ event_area: { _in: locations } },
								{
									event_tags: {
										events_tags_id: {
											name: {
												_in: filters.disciplines.length !== 0 ? filters.disciplines : undefined
											}
										}
									}
								},
								{
									_or: [
										{
											_and: [
												{
													end_date: {
														_null: true
													}
												},
												{
													start_date: {
														_lte: '$NOW'
													}
												}
											]
										},
										{
											end_date: {
												_nnull: true,
												_lte: '$NOW'
											}
										}
									]
								}
							]
						}
					})
				)
			);
		}
		if (filters.time === 'all') {
			return parse(
				Events,
				await directus.request(
					readItems('events', {
						fields: ['*', 'event_tags.events_tags_id.name'],
						filter: {
							_and: [
								{ event_area: { _in: locations } },
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
		}
		return parse(
			Events,
			await directus.request(
				readItems('events', {
					fields: ['*', 'event_tags.events_tags_id.name'],
					filter: {
						_and: [
							{ event_area: { _in: locations } },
							{
								event_tags: {
									events_tags_id: {
										name: {
											_in: filters.disciplines.length !== 0 ? filters.disciplines : undefined
										}
									}
								}
							},
							{
								start_date: {
									_gte: '$NOW'
								}
							}
						]
					}
				})
			)
		);
	})();

	return { events };
}

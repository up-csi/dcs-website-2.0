/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { Events } from '$lib/models/event';
import { readItems } from '@directus/sdk';
import { parse } from 'valibot';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const filters = {
		locations: url.searchParams.getAll('location'),
		discipline: url.searchParams.get('discipline'),
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
						filter: {
							_and: [
								{ event_area: { _in: locations } },
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
						filter: { event_area: { _in: locations } }
					})
				)
			);
		}
		return parse(
			Events,
			await directus.request(
				readItems('events', {
					filter: {
						_and: [
							{ event_area: { _in: locations } },
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

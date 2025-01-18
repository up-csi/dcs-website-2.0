/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { Events } from '$lib/models/event.js';
import { readItems } from '@directus/sdk';
import { parse } from 'valibot';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const filters = {
		location: url.searchParams.get('location'),
		discipline: url.searchParams.get('discipline'),
		time: url.searchParams.get('time')
	};
	const events = await (async () => {
		if (filters.time === 'past') {
			return parse(
				Events,
				await directus.request(
					readItems('events', {
						filter: {
							_and: [
								{ location: { _eq: filters.location } },
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
			return parse(Events, await directus.request(readItems('events')));
		}
		return parse(
			Events,
			await directus.request(
				readItems('events', {
					filter: {
						_and: [
							{ location: { _eq: filters.location } },
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

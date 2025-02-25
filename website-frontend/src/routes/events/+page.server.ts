/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const filters = {
		locations: url.searchParams.getAll('location'),
		disciplines: url.searchParams.getAll('discipline'),
		time: url.searchParams.get('time')
	};
	const location_filters = await directus
		.request(
			readItems('events_areas', {
				fields: ['name'],
				sort: ['order']
			})
		)
		.then((res) => res.map(({ name }) => name));
	const discipline_filters = await directus
		.request(
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
		.then((res) => res.map(({ name }) => name));
	const events = await (async () => {
		if (filters.time === 'past') {
			return await directus.request(
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
			);
		}
		if (filters.time === 'all') {
			return await directus.request(
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
			);
		}
		return await directus.request(
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
						},
						{
							start_date: {
								_gte: '$NOW'
							}
						}
					]
				}
			})
		);
	})();

	return { events, location_filters, discipline_filters };
}

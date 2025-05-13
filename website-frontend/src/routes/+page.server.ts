/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const global = await directus.request(readSingleton('global'));
	const home = await directus.request(
		readSingleton('home', {
			fields: [
				'*',
				{
					featured_news: [
						{
							news_id: [
								'*',
								{
									user_created: ['first_name', 'last_name']
								},
								{
									user_updated: ['first_name', 'last_name']
								}
							]
						}
					]
				},
				{
					recent_news: [
						{
							news_id: [
								'*',
								{
									user_created: ['first_name', 'last_name']
								},
								{
									user_updated: ['first_name', 'last_name']
								}
							]
						}
					]
				},
				{
					recent_events: [
						{
							events_id: [
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
							]
						}
					]
				}
			]
		})
	);
	const news = await directus.request(
		readItems('news', {
			fields: [
				'*',
				{
					user_created: ['first_name', 'last_name']
				},
				{
					user_updated: ['first_name', 'last_name']
				}
			],
			sort: ['-date_created']
		})
	);
	const events = await directus.request(
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
			]
		})
	);

	return { global, home, news, events };
}

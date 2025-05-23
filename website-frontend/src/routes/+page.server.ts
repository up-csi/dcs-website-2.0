/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const news = await directus.request(
		readItems('news', {
			fields: [
				'*',
				{
					user_created: ['first_name', 'last_name']
				},
				{
					user_updated: ['first_name', 'last_name']
				},
				{
					news_tags: [
						{
							news_tags_id: ['name']
						}
					]
				}
			],
			sort: ['-date_created']
		})
	);
	const [featured_news, recent_news, recent_events] = await (async () => {
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
									},
									{
										news_tags: [
											{
												news_tags_id: ['name']
											}
										]
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
									},
									{
										news_tags: [
											{
												news_tags_id: ['name']
											}
										]
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
		const featured_news = home.featured_news
			?.filter((item) => typeof item !== 'string')
			.map((item) => item.news_id);
		const recent_news = home.recent_news
			?.filter((item) => typeof item !== 'string')
			.map((item) => item.news_id);
		const recent_events = home.recent_events
			?.filter((item) => typeof item !== 'number')
			.map((item) => item.events_id);
		return [featured_news, recent_news, recent_events];
	})();

	return { news, featured_news, recent_news, recent_events };
}

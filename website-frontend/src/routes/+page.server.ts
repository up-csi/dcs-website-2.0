/** @type {import('./$types').PageServerLoad} */
import { aggregate, readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { awaitAsync, parse, parseAsync, pipeAsync, promise } from 'valibot';
import { News } from '$lib/models/news';
import { Home } from '$lib/models/home';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const news_limit = 12;
	const news_count = await directus
		.request(
			aggregate('news', {
				aggregate: { count: '*' }
			})
		)
		.then((res) => parseInt(res[0].count ?? '0'));
	if (parseInt(url.searchParams.get('limit') ?? news_limit.toString()) < news_limit)
		throw redirect(302, url.pathname);
	const news = parseAsync(
		pipeAsync(promise(), awaitAsync(), News),
		directus.request(
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
				sort: ['-date_created'],
				limit: Math.max(news_limit, parseInt(url.searchParams.get('limit') ?? '0'))
			})
		)
	);
	const [featured_news, recent_news, recent_events] = await (async () => {
		const home = parse(
			Home,
			await directus.request(
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
			)
		);
		const featured_news = home.featured_news
			?.filter((item) => typeof item !== 'number')
			.map((item) => item.news_id);
		const recent_news = home.recent_news
			?.filter((item) => typeof item !== 'number')
			.map((item) => item.news_id);
		const recent_events = home.recent_events
			?.filter((item) => typeof item !== 'number')
			.map((item) => item.events_id);
		return [featured_news, recent_news, recent_events];
	})();

	return { news_limit, news_count, news, featured_news, recent_news, recent_events };
}

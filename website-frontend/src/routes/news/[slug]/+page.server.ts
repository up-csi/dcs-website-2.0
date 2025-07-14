/** @type {import('./$types').PageServerLoad} */
import { aggregate, readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error, redirect } from '@sveltejs/kit';
import { parse } from 'valibot';
import { News, NewsItem } from '$lib/models/news';

export async function load({ url, params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const news = parse(
		News,
		await directus.request(
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
				filter: {
					slug: {
						_eq: params.slug
					}
				},
				limit: 1
			})
		)
	);

	if (!news.length) {
		throw error(404, 'News item not found');
	}

	const news_item = parse(NewsItem, news[0]);

	const other_news_limit = 12;
	const other_news_count = await directus
		.request(
			aggregate('news', {
				aggregate: {
					count: '*'
				},
				query: {
					filter: {
						slug: {
							_neq: params.slug
						}
					}
				}
			})
		)
		.then((res) => res[0].count);
	if (parseInt(url.searchParams.get('limit') ?? other_news_limit.toString()) < other_news_limit)
		throw redirect(302, url.pathname);
	const other_news = parse(
		News,
		await directus.request(
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
				filter: {
					slug: {
						_neq: params.slug
					}
				},
				sort: ['-date_created'],
				limit: Math.max(other_news_limit, parseInt(url.searchParams.get('limit') ?? '0'))
			})
		)
	);

	const link = new URL(url.toString()).toString();

	return { link, other_news_limit, other_news_count, other_news, news_item };
}

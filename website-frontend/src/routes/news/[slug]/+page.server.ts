/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';
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
				}
			})
		)
	);

	const link = new URL(url.toString()).toString();

	return { link, other_news, news_item };
}

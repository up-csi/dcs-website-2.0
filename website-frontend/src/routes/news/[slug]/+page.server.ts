/** @type {import('./$types').PageServerLoad} */
import { aggregate, readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';
import { awaitAsync, parse, parseAsync, pipeAsync, promise } from 'valibot';
import { News, NewsItem } from '$lib/models/news';
import type { Actions } from './$types';

const limit = 12;

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
	const other_news = parseAsync(
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
				filter: {
					slug: {
						_neq: params.slug
					}
				},
				sort: ['-date_created'],
				limit
			})
		)
	);

	const link = new URL(url.toString()).toString();

	return { link, other_news_count, other_news, news_item };
}

export const actions = {
	loadMore: async ({ request, params, fetch }) => {
		const data = await request.formData();
		const current = JSON.parse(data.get('data') as string);
		const directus = getDirectusInstance(fetch);
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
					offset: current.length,
					limit
				})
			)
		);

		const items = [...current, ...other_news];
		return {
			success: true,
			items
		};
	}
} satisfies Actions;

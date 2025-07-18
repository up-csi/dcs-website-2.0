/** @type {import('./$types').PageServerLoad} */
import { aggregate, readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { awaitAsync, parse, parseAsync, pipeAsync, promise } from 'valibot';
import { News } from '$lib/models/news';
import { NewsOverview } from '$lib/models/news_overview.js';
import type { Actions } from './$types';

const news_limit = 12;

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const news_overview = parse(NewsOverview, await directus.request(readSingleton('news_overview')));
	const news_count = await directus
		.request(
			aggregate('news', {
				aggregate: { count: '*' }
			})
		)
		.then((res) => parseInt(res[0].count ?? '0'));
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
				limit: news_limit
			})
		)
	);

	return { news_overview, news_limit, news_count, news };
}

export const actions = {
	loadMore: async ({ request, fetch }) => {
		const data = await request.formData();
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
					sort: ['-date_created'],
					offset: parseInt((data.get('offset') ?? '0') as string),
					limit: news_limit
				})
			)
		);

		return {
			success: true,
			items: news
		};
	}
} satisfies Actions;

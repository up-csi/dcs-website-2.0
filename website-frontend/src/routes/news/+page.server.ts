/** @type {import('./$types').PageServerLoad} */
import { aggregate, readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { awaitAsync, parse, parseAsync, pipeAsync, promise } from 'valibot';
import { News } from '$lib/models/news';
import { redirect } from '@sveltejs/kit';
import { NewsOverview } from '$lib/models/news_overview.js';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const news_overview = parse(NewsOverview, await directus.request(readSingleton('news_overview')));
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

	return { news_overview, news_limit, news_count, news };
}

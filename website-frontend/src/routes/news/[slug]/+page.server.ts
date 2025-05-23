/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
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
			filter: {
				slug: {
					_eq: params.slug
				}
			},
			limit: 1
		})
	);

	if (!news.length) {
		throw error(404, 'News item not found');
	}

	const news_item = news[0];

	const other_news = await directus.request(
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
	);

	return { other_news, news_item };
}

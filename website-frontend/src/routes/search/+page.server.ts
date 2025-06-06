/** @type {import('./$types').PageServerLoad} */
import { readItem, readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { parse } from 'valibot';
import { News } from '$lib/models/news';
import { Events } from '$lib/models/event';
import { People } from '$lib/models/people';
import { Laboratories } from '$lib/models/laboratories';
import { Publications } from '$lib/models/publications';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const news = parse(
		News,
		await directus.request(
			readItems('news', {
				search: url.searchParams.get('q') ?? undefined
			})
		)
	);
	const events = parse(
		Events,
		await directus.request(
			readItems('events', {
				search: url.searchParams.get('q') ?? undefined
			})
		)
	);
	const people = parse(
		People,
		await directus.request(
			readItems('people', {
				search: url.searchParams.get('q') ?? undefined
			})
		)
	);
	const laboratories = parse(
		Laboratories,
		await directus.request(
			readItems('laboratories', {
				search: url.searchParams.get('q') ?? undefined
			})
		)
	);
	const publications = await (async () => {
		const publications = parse(
			Publications,
			await directus.request(
				readItems('publications', {
					search: url.searchParams.get('q') ?? undefined,
					fields: [
						'*',
						{
							publication_tags: [
								{
									publications_tags_id: ['name']
								}
							]
						}
					]
				})
			)
		);

		return await Promise.all(
			publications.map(async (item) => {
				return await {
					...item,
					authors: await Promise.all(
						item.authors
							? item.authors.map(async (author) => {
									if (typeof author.link === 'undefined') return author;
									if (typeof author.link === 'object') {
										const person = await directus.request(readItem('people', author.link.key));
										return {
											...author,
											link: `/people/${person.username}`
										};
									}
								})
							: []
					)
				};
			})
		);
	})();

	return {
		news,
		events,
		people,
		laboratories,
		publications
	};
}

/** @type {import('./$types').PageServerLoad} */
import { aggregate, readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { awaitAsync, parse, parseAsync, pipeAsync, promise } from 'valibot';
import { News, NewsItem } from '$lib/models/news';
import { Events, Event } from '$lib/models/events';
import { People, Person } from '$lib/models/people';
import { Laboratories, Laboratory } from '$lib/models/laboratories';
import { Publication, Publications } from '$lib/models/publications';
import type { Actions } from '@sveltejs/kit';

const limit = 6;

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const news_count = await directus
		.request(
			aggregate('news', {
				aggregate: { count: '*' },
				query: {
					search: url.searchParams.get('q') ?? undefined
				}
			})
		)
		.then((res) => parseInt(res[0].count ?? '0'));
	const news = parseAsync(
		pipeAsync(promise(), awaitAsync(), News),
		directus.request(
			readItems('news', {
				search: url.searchParams.get('q') ?? undefined,
				limit
			})
		)
	);
	const events_count = await directus
		.request(
			aggregate('events', {
				aggregate: { count: '*' },
				query: {
					search: url.searchParams.get('q') ?? undefined
				}
			})
		)
		.then((res) => parseInt(res[0].count ?? '0'));
	const events = parseAsync(
		pipeAsync(promise(), awaitAsync(), Events),
		directus.request(
			readItems('events', {
				search: url.searchParams.get('q') ?? undefined,
				limit
			})
		)
	);
	const people_count = await directus
		.request(
			aggregate('people', {
				aggregate: { count: '*' },
				query: {
					search: url.searchParams.get('q') ?? undefined
				}
			})
		)
		.then((res) => parseInt(res[0].count ?? '0'));
	const people = parseAsync(
		pipeAsync(promise(), awaitAsync(), People),
		directus.request(
			readItems('people', {
				search: url.searchParams.get('q') ?? undefined,
				limit
			})
		)
	);
	const laboratories_count = await directus
		.request(
			aggregate('laboratories', {
				aggregate: { count: '*' },
				query: {
					search: url.searchParams.get('q') ?? undefined
				}
			})
		)
		.then((res) => parseInt(res[0].count ?? '0'));
	const laboratories = parseAsync(
		pipeAsync(promise(), awaitAsync(), Laboratories),
		directus.request(
			readItems('laboratories', {
				search: url.searchParams.get('q') ?? undefined,
				limit
			})
		)
	);
	const publications_count = await directus
		.request(
			aggregate('publications', {
				aggregate: { count: '*' },
				query: {
					search: url.searchParams.get('q') ?? undefined
				}
			})
		)
		.then((res) => parseInt(res[0].count ?? '0'));
	const peopleMap = new Map((await people).map((person) => [person.id, person]));
	const publications = parseAsync(
		pipeAsync(promise(), awaitAsync(), Publications),
		directus
			.request(
				readItems('publications', {
					search: url.searchParams.get('q') ?? undefined,
					sort: ['-publish_date'],
					limit,
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
			.then(
				async (res) =>
					await Promise.all(
						res.map(async (item) => {
							return {
								...item,
								authors: await Promise.all(
									item.authors
										? item.authors.map(async (author) => {
												if (typeof author.link === 'undefined') return author;
												if (typeof author.link === 'object') {
													const person = peopleMap.get(author.link.key);
													return {
														...author,
														link: `/people/${person ? (person.username ?? '') : ''}`
													};
												}
											})
										: []
								)
							};
						})
					)
			)
	);

	return {
		news_count,
		events_count,
		people_count,
		laboratories_count,
		publications_count,
		news,
		events,
		people,
		laboratories,
		publications
	};
}

export const actions = {
	loadMore: async ({ request, fetch, url }) => {
		const tab = url.searchParams.get('tab') ?? 'News';
		const data = await request.formData();
		const current = JSON.parse(data.get('data') as string);
		const directus = getDirectusInstance(fetch);
		let news: News = [];
		let events: Events = [];
		let people: People = [];
		let laboratories: Laboratories = [];
		let publications: Publications = [];
		let items: (NewsItem | Event | Person | Laboratory | Publication)[] = [];
		if (tab == 'News') {
			news = parse(
				News,
				await directus.request(
					readItems('news', {
						search: url.searchParams.get('q') ?? undefined,
						offset: current.length,
						limit
					})
				)
			);
			items = [...current, ...news];
		}
		if (tab == 'Events') {
			events = parse(
				Events,
				await directus.request(
					readItems('events', {
						search: url.searchParams.get('q') ?? undefined,
						offset: current.length,
						limit
					})
				)
			);
			items = [...current, ...events];
		}
		if (tab == 'People') {
			people = parse(
				People,
				await directus.request(
					readItems('people', {
						search: url.searchParams.get('q') ?? undefined,
						offset: current.length,
						limit
					})
				)
			);
			items = [...current, ...people];
		}
		if (tab == 'Laboratories') {
			laboratories = parse(
				Laboratories,
				await directus.request(
					readItems('laboratories', {
						search: url.searchParams.get('q') ?? undefined,
						offset: current.length,
						limit
					})
				)
			);
			items = [...current, ...laboratories];
		}
		if (tab == 'Publications') {
			const people = new Map(
				(await directus.request(readItems('people'))).map((person) => [person.id, person])
			);
			publications = parse(
				Publications,
				await directus
					.request(
						readItems('publications', {
							search: url.searchParams.get('q') ?? undefined,
							sort: ['-publish_date'],
							offset: current.length,
							limit,
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
					.then(
						async (res) =>
							await Promise.all(
								res.map(async (item) => {
									return {
										...item,
										authors: await Promise.all(
											item.authors
												? item.authors.map(async (author) => {
														if (typeof author.link === 'undefined') return author;
														if (typeof author.link === 'object') {
															const person = people.get(author.link.key);
															return {
																...author,
																link: `/people/${person ? (person.username ?? '') : ''}`
															};
														}
													})
												: []
										)
									};
								})
							)
					)
			);
			items = [...current, ...publications];
		}

		return {
			success: true,
			items
		};
	}
} satisfies Actions;

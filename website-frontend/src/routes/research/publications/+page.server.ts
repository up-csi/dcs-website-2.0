/** @type {import('./$types').PageServerLoad} */
import { aggregate, readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { awaitAsync, parse, parseAsync, pipeAsync, promise } from 'valibot';
import { Publications } from '$lib/models/publications';
import { Laboratories } from '$lib/models/laboratories';
import { PublicationsTags } from '$lib/models/publications_tags.js';
import { Research } from '$lib/models/research';
import type { Actions } from '@sveltejs/kit';

const limit = 12;

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);

	const research = parse(Research, await directus.request(readSingleton('research')));

	const filters = {
		years: url.searchParams.getAll('year'),
		laboratories: url.searchParams.getAll('laboratory'),
		tags: url.searchParams.getAll('tags')
	};

	const people = new Map(
		(await directus.request(readItems('people'))).map((person) => [person.id, person])
	);

	const years_filters = await (async () => {
		const res = parse(
			Publications,
			await directus.request(
				readItems('publications', {
					fields: ['publish_date'],
					sort: ['-publish_date']
				})
			)
		);

		const years = res
			.map((pub) => {
				if (pub.publish_date) {
					return new Date(pub.publish_date).getFullYear();
				}
			})
			.filter((year) => year !== undefined);

		return years.filter((item, index) => years.indexOf(item) === index);
	})();

	const laboratories_filters = parse(
		Laboratories,
		await directus.request(
			readItems('laboratories', {
				fields: ['name'],
				sort: ['name']
			})
		)
	).map(({ name }) => name);

	const tags_filters = parse(
		PublicationsTags,
		await directus.request(
			readItems('publications_tags', {
				fields: ['name'],
				sort: ['name']
			})
		)
	).map(({ name }) => name);

	const publications_count = await directus
		.request(
			aggregate('publications', {
				aggregate: { count: '*' },
				query: {
					filter: {
						'year(publish_date)': { _in: filters.years.length !== 0 ? filters.years : undefined },
						laboratory: {
							name: { _in: filters.laboratories.length !== 0 ? filters.laboratories : undefined }
						},
						publication_tags: {
							publications_tags_id: {
								name: { _in: filters.tags.length !== 0 ? filters.tags : undefined }
							}
						}
					}
				}
			})
		)
		.then((res) => parseInt(res[0].count ?? '0'));

	const publications = parseAsync(
		pipeAsync(promise(), awaitAsync(), Publications),
		directus
			.request(
				readItems('publications', {
					fields: [
						'*',
						{
							publication_tags: [
								{
									publications_tags_id: ['name']
								}
							]
						}
					],
					filter: {
						'year(publish_date)': { _in: filters.years.length !== 0 ? filters.years : undefined },
						laboratory: {
							name: { _in: filters.laboratories.length !== 0 ? filters.laboratories : undefined }
						},
						publication_tags: {
							publications_tags_id: {
								name: { _in: filters.tags.length !== 0 ? filters.tags : undefined }
							}
						}
					},
					sort: ['-publish_date'],
					limit
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

	return {
		research,
		years_filters,
		laboratories_filters,
		tags_filters,
		publications_count,
		publications
	};
}

export const actions = {
	loadMore: async ({ request, fetch, url }) => {
		const data = await request.formData();
		const current = JSON.parse(data.get('data') as string);
		const directus = getDirectusInstance(fetch);
		const filters = {
			years: url.searchParams.getAll('year'),
			laboratories: url.searchParams.getAll('laboratory'),
			tags: url.searchParams.getAll('tags')
		};
		const people = new Map(
			(await directus.request(readItems('people'))).map((person) => [person.id, person])
		);
		const publications = parse(
			Publications,
			await directus
				.request(
					readItems('publications', {
						fields: [
							'*',
							{
								publication_tags: [
									{
										publications_tags_id: ['name']
									}
								]
							}
						],
						filter: {
							'year(publish_date)': { _in: filters.years.length !== 0 ? filters.years : undefined },
							laboratory: {
								name: { _in: filters.laboratories.length !== 0 ? filters.laboratories : undefined }
							},
							publication_tags: {
								publications_tags_id: {
									name: { _in: filters.tags.length !== 0 ? filters.tags : undefined }
								}
							}
						},
						sort: ['-publish_date'],
						offset: current.length,
						limit
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
		const items = [...current, ...publications].sort((a, b) => {
			if ((url.searchParams.get('sort') ?? '') === 'author') {
				const aLastName = a.authors[0]?.last_name || '';
				const bLastName = b.authors[0]?.last_name || '';
				return aLastName.localeCompare(bLastName);
			} else if ((url.searchParams.get('sort') ?? '') === 'title') {
				const a_title = a.title || '';
				const b_title = b.title || '';
				return a_title.localeCompare(b_title);
			} else {
				return (b.publish_date ?? '1970-01-01').localeCompare(a.publish_date ?? '1970-01-01');
			}
		});
		return {
			success: true,
			items
		};
	}
} satisfies Actions;

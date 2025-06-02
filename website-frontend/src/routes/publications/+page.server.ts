/** @type {import('./$types').PageServerLoad} */
import { readItem, readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { parse } from 'valibot';
import { Publications } from '$lib/models/publications';
import { Laboratories } from '$lib/models/laboratories';
import { PublicationsTags } from '$lib/models/publications_tags.js';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);

	const filters = {
		years: url.searchParams.getAll('year'),
		laboratories: url.searchParams.getAll('laboratory'),
		tags: url.searchParams.getAll('tags')
	};

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

	const publications = await (async () => {
		const res = parse(
			Publications,
			await directus.request(
				readItems('publications', {
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
					sort: ['-publish_date']
				})
			)
		);

		return await Promise.all(
			res.map(async (item) => {
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

	return { publications, years_filters, laboratories_filters, tags_filters };
}

/** @type {import('./$types').PageServerLoad} */
import { readItem, readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';
import { parse } from 'valibot';
import { Laboratories, Laboratory } from '$lib/models/laboratories';
import { Publications } from '$lib/models/publications';

export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const slug = params.slug;

	const laboratories = parse(
		Laboratories,
		await directus.request(
			readItems('laboratories', {
				filter: {
					slug: { _eq: slug }
				},
				limit: 1,
				fields: [
					'*',
					{
						background_images: [
							{
								directus_files_id: ['id']
							}
						]
					},
					{
						affiliates: [
							'role',
							{
								people_id: ['*']
							}
						]
					},
					{
						events: [
							{
								events_id: ['*']
							}
						]
					}
				]
			})
		)
	);

	if (!laboratories || laboratories.length === 0) {
		throw error(404, 'Lab not found');
	}

	const laboratory = parse(Laboratory, laboratories[0]);

	const publications = await (async () => {
		const publications = parse(
			Publications,
			await directus.request(
				readItems('publications', {
					filter: {
						laboratory: {
							slug: { _eq: slug }
						}
					},
					sort: ['-publish_date']
				})
			)
		);

		return await Promise.all(
			publications.map(async (item) => {
				return await {
					...item,
					authors: (
						await Promise.all(
							item.authors
								? item.authors.map(async (author) => {
										if (typeof author.link === 'undefined') return author;
										if (typeof author.link === 'object') {
											const person = await directus.request(readItem('people', author.link.key));
											return {
												...author,
												link: `/people/${person.category}/${person.username}`
											};
										}
									})
								: []
						)
					).filter((author) => author !== undefined)
				};
			})
		);
	})();

	return {
		laboratory,
		publications
	};
}

/** @type {import('./$types').PageServerLoad} */
import { readItem, readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const slug = params.slug;

	const laboratories = await directus.request(
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
	);

	if (!laboratories || laboratories.length === 0) {
		throw error(404, 'Lab not found');
	}

	const laboratory = laboratories[0];

	const publications = await directus
		.request(
			readItems('publications', {
				filter: {
					laboratory: {
						slug: { _eq: slug }
					}
				},
				sort: ['-publish_date']
			})
		)
		.then(
			async (res) =>
				await Promise.all(
					res.map(async (item) => {
						return await {
							...item,
							authors: (
								await Promise.all(
									item.authors.map(async (author) => {
										if (typeof author.link === 'undefined') return author;
										if (typeof author.link === 'object') {
											const person = await directus.request(readItem('people', author.link.key));
											return {
												...author,
												link: `/people/${person.category}/${person.username}`
											};
										}
									})
								)
							).filter((author) => author !== undefined)
						};
					})
				)
		);

	return {
		laboratory,
		publications
	};
}

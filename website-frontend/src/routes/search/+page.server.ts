/** @type {import('./$types').PageServerLoad} */
import { readItem, readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch, url }) {
	const directus = getDirectusInstance(fetch);
	const news = await directus.request(
		readItems('news', {
			search: url.searchParams.get('q') ?? undefined
		})
	);
	const events = await directus.request(
		readItems('events', {
			search: url.searchParams.get('q') ?? undefined
		})
	);
	const people = await directus.request(
		readItems('people', {
			search: url.searchParams.get('q') ?? undefined
		})
	);
	const laboratories = await directus.request(
		readItems('laboratories', {
			search: url.searchParams.get('q') ?? undefined
		})
	);
	const publications = await directus
		.request(
			readItems('publications', {
				search: url.searchParams.get('q') ?? undefined
			})
		)
		.then(
			async (res) =>
				await Promise.all(
					res.map(async (item) => {
						return await {
							...item,
							authors: await Promise.all(
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
						};
					})
				)
		);

	return {
		news,
		events,
		people,
		laboratories,
		publications
	};
}

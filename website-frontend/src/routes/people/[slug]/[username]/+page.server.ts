/** @type {import('./$types').PageServerLoad} */
import { readItems, readItem } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';
import { parse } from 'valibot';
import { People, Person } from '$lib/models/people';

export async function load({ params, fetch }) {
	const directus = getDirectusInstance(fetch);
	const username = params.username;

	const people = parse(
		People,
		await directus.request(
			readItems('people', {
				filter: {
					username: { _eq: username }
				},
				fields: [
					'*',
					{
						affiliations: [
							'role',
							{
								laboratories_id: ['name']
							}
						]
					},
					{
						publications: [
							{
								publications_id: ['*']
							}
						]
					}
				],
				limit: 1
			})
		)
	);

	if (!people || people.length === 0) {
		throw error(404, 'Person not found');
	}

	const person = parse(Person, people[0]);

	if (person.publications && person.publications.length > 0) {
		const processedPublications = await Promise.all(
			person.publications.map(async (pub) => {
				if (typeof pub !== 'object' || !pub || !('publications_id' in pub)) {
					return pub;
				}
				const publication = pub.publications_id;
				if (publication && typeof publication === 'object' && publication.authors) {
					publication.authors = await Promise.all(
						publication.authors.map(async (author) => {
							if (typeof author.link === 'undefined') return author;
							if (typeof author.link === 'object') {
								const person = parse(
									Person,
									await directus.request(readItem('people', author.link.key))
								);
								return {
									...author,
									link: `/people/${person.category}/${person.username}`
								};
							}
							return author;
						})
					);
				}
				return pub;
			})
		);
		person.publications = processedPublications as typeof person.publications;
	}

	return { person };
}

/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import directusFetch from '$lib/server/fetch';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const directus = await getDirectusInstance(fetch);
	const person = await directusFetch(directus, 'people', {
		filter: {
			username: { _eq: params.username }
		},
		limit: 1
	})
		.then((res) => res[0])
		.catch(() => {
			throw error(404, 'Person not found');
		});
	const laboratory_ids = await directusFetch(directus, 'people_laboratories', {
		filter: {
			people_id: { _eq: person.id }
		}
	}).then((res) => res.map((res) => res.laboratories_id));
	const laboratories =
		laboratory_ids.length > 0
			? await directusFetch(directus, 'laboratories', {
					filter: {
						id: { _in: laboratory_ids }
					}
				})
			: [];

	return { person, laboratories };
}

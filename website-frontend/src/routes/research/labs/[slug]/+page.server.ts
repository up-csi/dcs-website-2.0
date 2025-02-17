/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import { parse } from 'valibot';
import { Laboratory } from '$lib/models/laboratories';
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
			fields: ['*', 'background_images.directus_files_id.*']
		})
	);

	if (!laboratories || laboratories.length === 0) {
		throw error(404, 'Lab not found');
	}

	return {
		laboratory: laboratories[0]
	};
}

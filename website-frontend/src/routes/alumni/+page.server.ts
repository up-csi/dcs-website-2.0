/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);

	const alumni = await directus.request(
		readItems('alumni', {
			fields: ['*']
		})
	);

	const alumni_overview = await directus.request(readSingleton('alumni_overview', {}));

	return {
		alumni,
		alumni_overview
	};
}

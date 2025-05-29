/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { parse } from 'valibot';
import { Alumni } from '$lib/models/alumni';
import { AlumniOverview } from '$lib/models/alumni_overview';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);

	const alumni = parse(
		Alumni,
		await directus.request(
			readItems('alumni', {
				fields: ['*']
			})
		)
	);

	const alumni_overview = parse(
		AlumniOverview,
		await directus.request(readSingleton('alumni_overview', {}))
	);

	return {
		alumni,
		alumni_overview
	};
}

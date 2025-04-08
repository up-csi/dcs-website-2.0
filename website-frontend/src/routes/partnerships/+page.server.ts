/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus.js';
import type { Partnerships } from '$lib/models/partnerships.js';
import type { PartnershipsOverview } from '$lib/models/partnerships_overview.js';
import { readItems, readSingleton } from '@directus/sdk';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	
	const content: PartnershipsOverview = await directus.request(readSingleton('partnerships_overview'));
	const partnerships: Partnerships = await directus.request(readItems('partnerships'));

	return {
		content,
		partnerships
	}
}

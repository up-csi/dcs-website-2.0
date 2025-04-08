/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus.js';
import { readItems } from '@directus/sdk';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	
	const content = await directus.request(readItems('partnerships_overview'));
	const partnerships = await directus.request(readItems('partnerships'));

	return {
		content,
		partnerships
	}
}

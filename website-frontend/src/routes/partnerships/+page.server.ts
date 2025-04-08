/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus.js';
import type { Partners } from '$lib/types/partners';
import { readItems } from '@directus/sdk';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	
	const partners = await directus.request();
}

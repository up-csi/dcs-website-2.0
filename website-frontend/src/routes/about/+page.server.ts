/** @type {import('./$types').PageServerLoad} */
import { readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const about = await directus.request(readSingleton('about'));

	return { about };
}

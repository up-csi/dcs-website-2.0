/** @type {import('./$types').PageServerLoad} */
import { readSingleton } from '@directus/sdk';
import { parse } from 'valibot';
import { About } from '$lib/models/about';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	return {
		about: parse(About, await directus.request(readSingleton('about')))
	};
}

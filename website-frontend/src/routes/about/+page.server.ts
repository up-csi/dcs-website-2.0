/** @type {import('./$types').PageServerLoad} */
import { readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { parse } from 'valibot';
import { About } from '$lib/models/about';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const about = parse(About, await directus.request(readSingleton('about')));

	return { about };
}

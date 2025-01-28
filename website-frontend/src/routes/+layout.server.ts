/** @type {import('./$types').PageServerLoad} */
import { readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { Global } from '$lib/models/global';
import { parse } from 'valibot';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const global = parse(Global, await directus.request(readSingleton('global')));

	return { global };
}

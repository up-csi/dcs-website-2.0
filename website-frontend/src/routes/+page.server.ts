/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { Global } from '$lib/models/global';
import { Events } from '$lib/models/event';
import { parse } from 'valibot';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const global = parse(Global, await directus.request(readSingleton('global')));
	const events = parse(Events, await directus.request(readItems('events')));

	return { global, events };
}

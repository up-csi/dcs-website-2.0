/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { parse } from 'valibot';
import { Research } from '$lib/models/research';
import { Laboratories } from '$lib/models/laboratories';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const research = parse(Research, await directus.request(readSingleton('research')));
	const laboratories = parse(Laboratories, await directus.request(readItems('laboratories')));

	return { research, laboratories };
}

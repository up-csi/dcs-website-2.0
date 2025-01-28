/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { Laboratories } from '$lib/models/laboratories';
import { parse } from 'valibot';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const laboratories = parse(Laboratories, await directus.request(readItems('laboratories')));

	return { laboratories };
}

/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import { parse } from 'valibot';
import getDirectusInstance from '$lib/directus';
import { Laboratories } from '$lib/models/laboratories';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	return {
		laboratories: parse(Laboratories, await directus.request(readItems('laboratories')))
	};
}

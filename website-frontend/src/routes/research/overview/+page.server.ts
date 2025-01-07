import { readItems } from '@directus/sdk';
import { parse } from 'valibot';
import getDirectusInstance from '$lib/directus';
import { Laboratories } from '$lib/models/laboratories.js';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	return {
		laboratories: parse(Laboratories, await directus.request(readItems('laboratories')))
	};
}

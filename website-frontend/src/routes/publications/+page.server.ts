/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import { parse } from 'valibot';
import { Publications } from '$lib/models/publications';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	return {
		publications: parse(Publications, await directus.request(readItems('publications')))
	};
}

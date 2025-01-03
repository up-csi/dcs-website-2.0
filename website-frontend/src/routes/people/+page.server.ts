import { readItems } from '@directus/sdk';
import { parse } from 'valibot';
import { People } from '$lib/models/people';
import getDirectusInstance from '$lib/directus';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	return {
		people: parse(People, await directus.request(readItems('people')))
	};
}
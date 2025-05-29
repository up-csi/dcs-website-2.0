/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import { Partnerships } from '$lib/models/partnerships';
import { PartnershipsOverview } from '$lib/models/partnerships_overview';
import { parse } from 'valibot';
import { readItems, readSingleton } from '@directus/sdk';

export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);

	const content = parse(
		PartnershipsOverview,
		await directus.request(readSingleton('partnerships_overview'))
	);
	const partnerships = parse(Partnerships, await directus.request(readItems('partnerships')));

	return {
		content,
		partnerships
	};
}

/** @type {import('./$types').PageServerLoad} */
import { readItems, readSingleton } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { parse } from 'valibot';
import { Organizations } from '$lib/models/organizations';
import { OrganizationsOverview } from '$lib/models/organizations_overview';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);
	return {
		organizations: parse(Organizations, await directus.request(readItems('organizations'))),
		organizations_overview: parse(
			OrganizationsOverview,
			await directus.request(readSingleton('organizations_overview'))
		)
	};
}

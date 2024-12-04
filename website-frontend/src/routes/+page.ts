/** @type {import('./$types').PageLoad} */
import getDirectusInstance from '$lib/directus';
import { Global } from '$lib/models/global';
import { Events } from '$lib/models/event';
import { Alumni } from '$lib/models/alumni';
import { StudentCouncil } from '$lib/models/student_council';
import { readItems, readSingleton } from '@directus/sdk';
import { parse } from 'valibot';
export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	return {
		global: parse(Global, await directus.request(readSingleton('global'))),
		events: parse(Events, await directus.request(readItems('events'))),
		student_council: parse(
			StudentCouncil,
			await directus.request(readSingleton('student_council'))
		),
		alumni: parse(Alumni, await directus.request(readSingleton('alumni')))
	};
}

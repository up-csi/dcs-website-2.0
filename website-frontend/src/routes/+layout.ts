/** @type {import('./$types').LayoutLoad} */
import getDirectusInstance from '$lib/directus';
import { Global } from '$lib/models/global';
import { Events } from '$lib/models/event';
import { Alumni } from '$lib/models/alumni';
import { StudentCouncil } from '$lib/models/student_council';
import { Laboratories } from '$lib/models/laboratory.js';
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
		alumni: parse(Alumni, await directus.request(readSingleton('alumni'))),
		laboratories: parse(Laboratories, await directus.request(readItems('laboratories')))
	};
}

/** @type {import('./$types').LayoutLoad} */
import getDirectusInstance from '$lib/directus';
import { PUBLIC_APIURL } from '$env/static/public';
import { Global } from '$lib/models/global';
import { Events } from '$lib/models/event';
import { Alumni } from '$lib/models/alumni';
import { StudentCouncil } from '$lib/models/student_council';
import { readItems, readSingleton } from '@directus/sdk';
import { parse } from 'valibot';
export async function load({ fetch }) {
	const directus = getDirectusInstance(fetch);
	const schema = {
		global: parse(Global, await directus.request(readSingleton('global'))),
		events: parse(Events, await directus.request(readItems('events'))),
		student_council: parse(
			StudentCouncil,
			await directus.request(readSingleton('student_council'))
		),
		alumni: parse(Alumni, await directus.request(readSingleton('alumni')))
	};
	return {
		global: schema.global,
		events: schema.events,
		student_council: schema.student_council,
		alumni: schema.alumni,
		assets: {
			favicon: `${PUBLIC_APIURL}/assets/${schema.global.favicon}`
		}
	};
}

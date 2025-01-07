import { Global } from '$lib/models/global';
import { Events } from '$lib/models/event';
import { Alumni } from '$lib/models/alumni';
import { StudentCouncil } from '$lib/models/student_council';
import { Linkages } from '$lib/models/linkages';
import { type Schema } from '$lib/models/schema';
import { type RestClient, readItems, readSingleton } from '@directus/sdk';
import { parse } from 'valibot';

async function obtainSchema(directus: RestClient<Schema>, keys: Array<string>) {
	const schema = {
		global: parse(Global, await directus.request(readSingleton('global'))),
		events: parse(
			Events,
			await directus.request(
				readItems('events', {
					sort: ['-date_created']
				})
			)
		),
		student_council: parse(
			StudentCouncil,
			await directus.request(readSingleton('student_council'))
		),
		alumni: parse(Alumni, await directus.request(readSingleton('alumni'))),
		linkages: parse(Linkages, await directus.request(readSingleton('linkages')))
	};

	return Object.fromEntries(Object.entries(schema).filter(([key]) => keys.includes(key))) as Schema;
}

export default obtainSchema;

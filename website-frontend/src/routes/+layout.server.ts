/** @type {import('./$types').LayoutServerLoad} */
import getDirectusInstance from '$lib/directus';
import { PUBLIC_APIURL } from '$env/static/public';
import { Global } from '$lib/models/global';
import { Events } from '$lib/models/event';
import { Alumni } from '$lib/models/alumni';
import { StudentCouncil } from '$lib/models/student_council';
import { readItems, readSingleton } from '@directus/sdk';
import { parse } from 'valibot';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import { ReadableStream } from 'stream/web';
import { finished } from 'stream/promises';

async function downloadData(url: string, file_name: string) {
	return fetch(url)
		.then((res) => {
			if (!res.ok) {
				return Promise.reject(`Fetch failed with status: ${res.status}`);
			}

			const content_type = res.headers.get('content-type');
			if (!content_type) {
				return Promise.reject('Missing content-type header.');
			}

			const extension = content_type.split('/').pop();
			if (!extension) {
				return Promise.reject('Unable to determine file extension.');
			}

			const path = `./static/${file_name}.${extension}`;
			const file_stream = createWriteStream(path);

			return finished(
				Readable.fromWeb(res.body as ReadableStream<Uint8Array>).pipe(file_stream)
			).then(() => path); // Return the file path when complete
		})
		.catch(() => {
			return null; // Return `null` if any error occurs
		});
}

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

	const asset_urls = {
		favicon: `${PUBLIC_APIURL}/assets/${schema.global.favicon}`
	};

	const assets = await Promise.allSettled(
		Object.entries(asset_urls).map(([key, url]) =>
			downloadData(url, key).then((path) => [key, path])
		)
	).then((results) =>
		Object.fromEntries(
			results.map((result, index) => {
				const key = Object.keys(asset_urls)[index];
				if (result.status === 'fulfilled') {
					return result.value;
				} else {
					return [key, null];
				}
			})
		)
	);

	// Ensure fallbacks for undefined assets
	Object.keys(asset_urls).forEach((key) => {
		if (!assets[key]) {
			assets[key] = '/default/path/to/fallback.png'; // Replace with actual fallback
		}
	});

	return { schema, assets };
}

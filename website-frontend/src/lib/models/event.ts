import { cleanHtml } from '$lib/models-helpers';
import { array, isoTimestamp, nullable, object, pipe, string, type InferOutput } from 'valibot';

export const Event = object({
	date_created: pipe(string(), isoTimestamp()),
	event_headline: string(),
	event_content: pipe(string(), cleanHtml),
	tags: nullable(array(string()))
});

export const Events = array(Event);

export type Event = InferOutput<typeof Event>;
export type Events = InferOutput<typeof Events>;

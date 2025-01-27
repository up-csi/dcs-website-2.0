import { cleanHtml, toDateTime } from '$lib/models-helpers';
import {
	array,
	isoTimestamp,
	nullable,
	object,
	optional,
	pipe,
	string,
	type InferOutput
} from 'valibot';

export const Event = object({
	slug: string(),
	date_created: pipe(string(), isoTimestamp()),
	event_headline: string(),
	hero_image: optional(nullable(string())),
	event_content: pipe(string(), cleanHtml),
	tags: nullable(array(string())),
	start_date: pipe(string(), isoTimestamp(), toDateTime),
	end_date: nullable(pipe(string(), isoTimestamp(), toDateTime)),
	event_area: nullable(string()),
	display_location: nullable(string())
});

export const Events = array(Event);

export type Event = InferOutput<typeof Event>;
export type Events = InferOutput<typeof Events>;

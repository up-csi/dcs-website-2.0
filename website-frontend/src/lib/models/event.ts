import { cleanHtml } from '$lib/models-helpers';
import {
	array,
	custom,
	isoTimestamp,
	lazy,
	nullable,
	number,
	object,
	partial,
	pipe,
	string,
	union,
	type InferOutput
} from 'valibot';
import { EventsRelated } from './junctions/events_related';
import { EventsArea } from './events_areas';

export const Event = partial(
	object({
		id: number(),
		slug: string(),
		date_created: pipe(string(), isoTimestamp()),
		event_headline: string(),
		hero_image: nullable(string()),
		event_content: pipe(string(), cleanHtml),
		tags: nullable(array(string())),
		start_date: custom<'datetime'>((input) => typeof input === 'string'),
		end_date: nullable(custom<'datetime'>((input) => typeof input === 'string')),
		event_area: nullable(union([string(), lazy(() => EventsArea)])),
		display_location: nullable(string()),
		event_tags: nullable(union([array(string()), lazy(() => EventsRelated)]))
	})
);

export const Events = array(Event);

export type Event = InferOutput<typeof Event>;
export type Events = InferOutput<typeof Events>;

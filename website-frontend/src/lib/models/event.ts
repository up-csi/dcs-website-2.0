import { cleanHtml } from '$lib/models-helpers';
import {
	array,
	custom,
	isoTimestamp,
	lazy,
	nullable,
	number,
	object,
	optional,
	pipe,
	string,
	union,
	type GenericSchema,
	type InferOutput
} from 'valibot';

export type Event = {
	id: number;
	slug: string;
	date_created: string;
	event_headline: string;
	hero_image?: string | null;
	event_content: string;
	tags: string[] | null;
	start_date: 'datetime';
	end_date: 'datetime' | null;
	event_area: {
		name: string;
	} | null;
	display_location: string | null;
	event_tags: {
		events_tags_id: {
			name: string;
			related_events?:
				| string[]
				| {
						events_id: Event;
				  }[];
		};
	}[];
};

export const Event: GenericSchema<Event> = object({
	id: number(),
	slug: string(),
	date_created: pipe(string(), isoTimestamp()),
	event_headline: string(),
	hero_image: optional(nullable(string())),
	event_content: pipe(string(), cleanHtml),
	tags: nullable(array(string())),
	start_date: custom<'datetime'>((input) => typeof input === 'string'),
	end_date: nullable(custom<'datetime'>((input) => typeof input === 'string')),
	event_area: nullable(
		object({
			name: string()
		})
	),
	display_location: nullable(string()),
	event_tags: array(
		object({
			events_tags_id: object({
				name: string(),
				related_events: optional(
					union([
						array(string()),
						array(
							object({
								events_id: lazy(() => Event)
							})
						)
					])
				)
			})
		})
	)
});

export const Events = array(Event);

export type Events = InferOutput<typeof Events>;

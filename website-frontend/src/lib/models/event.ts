import { cleanHtml, toDateTime } from '$lib/models-helpers';
import {
	array,
	intersect,
	isoTimestamp,
	nullable,
	number,
	object,
	optional,
	pipe,
	string,
	type InferOutput
} from 'valibot';

const BaseEvent = object({
	id: number(),
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

const BaseEventTags = object({
	event_tags: array(
		object({
			events_tags_id: object({
				name: string()
			})
		})
	)
});

const NestedEventTags = object({
	event_tags: array(
		object({
			events_tags_id: object({
				name: string(),
				related_events: array(
					object({
						events_id: intersect([BaseEvent, BaseEventTags])
					})
				)
			})
		})
	)
});

export const Event = intersect([BaseEvent, BaseEventTags]);
export const Events = array(Event);
export const NestedEvent = intersect([BaseEvent, NestedEventTags]);
export const NestedEvents = array(NestedEvent);

export type Event = InferOutput<typeof Event>;
export type Events = InferOutput<typeof Events>;
export type NestedEvent = InferOutput<typeof NestedEvent>;
export type NestedEvents = InferOutput<typeof NestedEvents>;

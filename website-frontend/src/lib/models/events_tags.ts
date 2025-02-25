import { array, lazy, object, optional, string, union, type InferOutput } from 'valibot';
import { EventsRelated } from './junctions/events_related';
import { EventsTagsCategory } from './events_tags_categories';

export const EventsTag = object({
	name: string(),
	tag_category: union([string(), lazy(() => EventsTagsCategory)]),
	related_events: optional(union([array(string()), lazy(() => EventsRelated)]))
});

export const EventsTags = array(EventsTag);

export type EventsTag = InferOutput<typeof EventsTag>;
export type EventsTags = InferOutput<typeof EventsTags>;

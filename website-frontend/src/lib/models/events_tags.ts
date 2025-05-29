import { array, lazy, nullable, object, partial, string, union, type InferOutput } from 'valibot';
import { EventsRelated } from './junctions/events_related';
import { EventsTagsCategory } from './events_tags_categories';

export const EventsTag = partial(
	object({
		name: string(),
		tag_category: nullable(union([string(), lazy(() => EventsTagsCategory)])),
		related_events: nullable(union([array(string()), lazy(() => EventsRelated)]))
	})
);

export const EventsTags = array(EventsTag);

export type EventsTag = InferOutput<typeof EventsTag>;
export type EventsTags = InferOutput<typeof EventsTags>;

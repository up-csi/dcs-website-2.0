import { array, lazy, object, partial, string, union, type GenericSchema } from 'valibot';
import { Event } from '../event';
import { EventsTag } from '../events_tags';

export type EventsRelated = {
	events_id?: string | Event;
	events_tags_id?: string | EventsTag;
}[];

export const EventsRelated: GenericSchema<EventsRelated> = array(
	partial(
		object({
			events_id: union([string(), lazy(() => Event)]),
			events_tags_id: union([string(), lazy(() => EventsTag)])
		})
	)
);

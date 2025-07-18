import { array, lazy, object, partial, string, union, type GenericSchema } from 'valibot';
import { Event } from '../events';

import { Laboratory } from '../laboratories';

export type EventsLaboratories = {
	events_id?: string | Event;
	laboratories_id?: string | Laboratory;
}[];

export const EventsLaboratories: GenericSchema<EventsLaboratories> = array(
	partial(
		object({
			events_id: union([string(), lazy(() => Event)]),
			laboratories_id: union([string(), lazy(() => Laboratory)])
		})
	)
);

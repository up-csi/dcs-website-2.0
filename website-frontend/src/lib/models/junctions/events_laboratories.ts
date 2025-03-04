import { array, lazy, object, string, union, type GenericSchema } from 'valibot';
import { Event } from '../event';

import { Laboratory } from '../laboratories';

export type EventsLaboratories = {
	events_id: string | Event;
	laboratories_id: string | Laboratory;
}[];

export const EventsLaboratories: GenericSchema<EventsLaboratories> = array(
	object({
		events_id: union([string(), lazy(() => Event)]),
		laboratories_id: union([string(), lazy(() => Laboratory)])
	})
);

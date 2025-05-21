import { array, lazy, object, string, union, type GenericSchema } from 'valibot';
import { Event } from '../event';

export type RecentEvents = {
	events_id: string | Event;
}[];

export const RecentEvents: GenericSchema<RecentEvents> = array(
	object({
		events_id: union([string(), lazy(() => Event)])
	})
);

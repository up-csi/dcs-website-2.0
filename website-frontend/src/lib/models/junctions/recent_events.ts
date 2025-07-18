import { array, lazy, object, partial, string, union, type GenericSchema } from 'valibot';
import { Event } from '../events';

export type RecentEvents = {
	events_id?: string | Event;
}[];

export const RecentEvents: GenericSchema<RecentEvents> = array(
	partial(
		object({
			events_id: union([string(), lazy(() => Event)])
		})
	)
);

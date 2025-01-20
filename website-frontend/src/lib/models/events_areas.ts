import { array, integer, number, object, pipe, string, type InferOutput } from 'valibot';

export const EventsArea = object({
	id: string(),
	name: string(),
	area: string(),
	order: pipe(number(), integer())
});

export const EventsAreas = array(EventsArea);

export type EventsArea = InferOutput<typeof EventsArea>;
export type EventsAreas = InferOutput<typeof EventsAreas>;

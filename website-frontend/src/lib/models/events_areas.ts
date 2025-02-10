import { array, integer, number, object, partial, pipe, string, type InferOutput } from 'valibot';

export const EventsArea = partial(
	object({
		id: string(),
		name: string(),
		area: string(),
		order: pipe(number(), integer())
	})
);

export const EventsAreas = array(EventsArea);

export type EventsArea = InferOutput<typeof EventsArea>;
export type EventsAreas = InferOutput<typeof EventsAreas>;

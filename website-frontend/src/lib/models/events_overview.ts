import { nullable, object, partial, string, type InferOutput } from 'valibot';

export const EventsOverview = partial(
	object({
		background_image: nullable(string())
	})
);

export type EventsOverview = InferOutput<typeof EventsOverview>;

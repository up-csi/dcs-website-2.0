import { array, nullable, object, partial, string, type InferOutput } from 'valibot';

export const EventsTagsCategory = partial(
	object({
		name: string(),
		description: nullable(string())
	})
);

export const EventsTagsCategories = array(EventsTagsCategory);

export type EventsTagsCategory = InferOutput<typeof EventsTagsCategory>;
export type EventsTagsCategories = InferOutput<typeof EventsTagsCategories>;

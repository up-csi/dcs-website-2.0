import { array, nullable, object, string, type InferOutput } from 'valibot';

export const EventsTagsCategory = object({
	name: string(),
	description: nullable(string())
});

export const EventsTagsCategories = array(EventsTagsCategory);

export type EventsTagsCategory = InferOutput<typeof EventsTagsCategory>;
export type EventsTagsCategories = InferOutput<typeof EventsTagsCategories>;

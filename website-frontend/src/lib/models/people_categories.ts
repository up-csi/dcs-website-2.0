import { cleanHtml } from '$lib/models-helpers';
import { array, nullable, object, partial, pipe, string, type InferOutput } from 'valibot';

export const PeopleCategory = partial(
	object({
		title: string(),
		flexible_content: nullable(pipe(string(), cleanHtml)),
		background_image: nullable(string())
	})
);

export const PeopleCategories = array(PeopleCategory);

export type PeopleCategory = InferOutput<typeof PeopleCategory>;
export type PeopleCategories = InferOutput<typeof PeopleCategories>;

import { cleanHtml } from '$lib/models-helpers';
import { array, nullable, object, optional, pipe, string, type InferOutput } from 'valibot';

export const PeopleCategory = object({
	title: string(),
	flexible_content: pipe(string(), cleanHtml),
	background_image: optional(nullable(string()))
});

export const PeopleCategories = array(PeopleCategory);

export type PeopleCategory = InferOutput<typeof PeopleCategory>;
export type PeopleCategories = InferOutput<typeof PeopleCategories>;
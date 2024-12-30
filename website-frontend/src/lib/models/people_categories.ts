import { cleanHtml } from '$lib/models-helpers';
import { array, object, pipe, string, type InferOutput } from 'valibot';

export const PeopleCategory = object({
    title: string(),
	flexible_content: pipe(string(), cleanHtml)
});


export const PeopleCategories = array(PeopleCategory);

export type PeopleCategory = InferOutput<typeof PeopleCategory>;
export type PeopleCategories = InferOutput<typeof PeopleCategories>;
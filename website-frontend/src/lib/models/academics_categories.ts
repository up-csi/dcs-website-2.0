import { cleanHtml } from '$lib/models-helpers';
import { array, nullable, object, pipe, string, type InferOutput } from 'valibot';

export const AcademicsCategory = object({
	name: string(),
	slug: string(),
	description: nullable(string()),
	flexible_content: pipe(string(), cleanHtml)
});

export const AcademicsCategories = array(AcademicsCategory);

export type AcademicsCategory = InferOutput<typeof AcademicsCategory>;
export type AcademicsCategories = InferOutput<typeof AcademicsCategories>;

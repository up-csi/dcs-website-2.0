import { cleanHtml } from '$lib/models-helpers';
import { array, nullable, object, partial, pipe, string, type InferOutput } from 'valibot';

export const AcademicsCategory = partial(
	object({
		name: string(),
		slug: string(),
		description: nullable(string()),
		flexible_content: pipe(string(), cleanHtml),
		background_image: nullable(string())
	})
);

export const AcademicsCategories = array(AcademicsCategory);

export type AcademicsCategory = InferOutput<typeof AcademicsCategory>;
export type AcademicsCategories = InferOutput<typeof AcademicsCategories>;

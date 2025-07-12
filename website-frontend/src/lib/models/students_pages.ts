import { cleanHtml } from '$lib/models-helpers';
import { array, nullable, object, partial, pipe, string, type InferOutput } from 'valibot';

export const StudentsPage = partial(
	object({
		title: string(),
		slug: string(),
		flexible_content: pipe(string(), cleanHtml),
		background_image: nullable(string())
	})
);

export const StudentsPages = array(StudentsPage);

export type StudentsPage = InferOutput<typeof StudentsPage>;
export type StudentsPages = InferOutput<typeof StudentsPages>;

import { cleanHtml } from '$lib/models-helpers';
import { array, object, partial, pipe, string, type InferOutput } from 'valibot';

export const StudentsPage = partial(
	object({
		title: string(),
		slug: string(),
		flexible_content: pipe(string(), cleanHtml)
	})
);

export const StudentsPages = array(StudentsPage);

export type StudentsPage = InferOutput<typeof StudentsPage>;
export type StudentsPages = InferOutput<typeof StudentsPages>;

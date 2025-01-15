import { cleanHtml } from '$lib/models-helpers';
import { array, object, pipe, string, type InferOutput } from 'valibot';

export const StudentsPage = object({
	title: string(),
	slug: string(),
	flexible_content: pipe(string(), cleanHtml)
});

export const StudentsPages = array(StudentsPage);

export type StudentsPage = InferOutput<typeof StudentsPage>;
export type StudentsPages = InferOutput<typeof StudentsPages>;

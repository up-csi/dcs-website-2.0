import { cleanHtml } from '$lib/models-helpers';
import { nullable, object, optional, pipe, string, type InferOutput } from 'valibot';

export const StudentsOverview = object({
	flexible_content: pipe(string(), cleanHtml),
	background_image: optional(nullable(string()))
});

export type StudentsOverview = InferOutput<typeof StudentsOverview>;

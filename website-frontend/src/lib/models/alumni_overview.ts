import { cleanHtml } from '$lib/models-helpers';
import { nullable, object, optional, pipe, string, type InferOutput } from 'valibot';

export const AlumniOverview = object({
	flexible_content: pipe(string(), cleanHtml),
	background_image: optional(nullable(string()))
});

export type AlumniOverview = InferOutput<typeof AlumniOverview>;

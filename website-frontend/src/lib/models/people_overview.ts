import { cleanHtml } from '$lib/models-helpers';
import { nullable, object, optional, pipe, string, type InferOutput } from 'valibot';

export const PeopleOverview = object({
	flexible_content: pipe(string(), cleanHtml),
	background_image: optional(nullable(string()))
});

export type PeopleOverview = InferOutput<typeof PeopleOverview>;

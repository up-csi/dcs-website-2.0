import { cleanHtml } from '$lib/models-helpers';
import { object, pipe, string, optional, nullable, type InferOutput } from 'valibot';

export const PartnershipsOverview = object({
	flexible_content: pipe(string(), cleanHtml),
	background_image: optional(nullable(string()))
});

export type PartnershipsOverview = InferOutput<typeof PartnershipsOverview>;

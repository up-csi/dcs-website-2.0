import { cleanHtml } from '$lib/models-helpers';
import { nullable, object, optional, pipe, string, type InferOutput } from 'valibot';

export const OrganizationsOverview = object({
	flexible_content: nullable(pipe(string(), cleanHtml)),
	background_image: optional(nullable(string()))
});

export type OrganizationsOverview = InferOutput<typeof OrganizationsOverview>;

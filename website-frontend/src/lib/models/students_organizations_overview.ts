import { cleanHtml } from '$lib/models-helpers';
import { nullable, object, optional, pipe, string, type InferOutput } from 'valibot';

export const StudentsOrganizationsOverview = object({
	flexible_content: nullable(pipe(string(), cleanHtml)),
	background_image: optional(nullable(string()))
});

export type StudentsOrganizationsOverview = InferOutput<typeof StudentsOrganizationsOverview>;

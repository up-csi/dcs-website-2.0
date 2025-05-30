import { cleanHtml } from '$lib/models-helpers';
import { nullable, object, partial, pipe, string, type InferOutput } from 'valibot';

export const StudentsOrganizationsOverview = partial(
	object({
		flexible_content: nullable(pipe(string(), cleanHtml)),
		background_image: nullable(string())
	})
);

export type StudentsOrganizationsOverview = InferOutput<typeof StudentsOrganizationsOverview>;

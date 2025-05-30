import { cleanHtml } from '$lib/models-helpers';
import { nullable, object, partial, pipe, string, type InferOutput } from 'valibot';

export const StudentsOverview = partial(
	object({
		flexible_content: pipe(string(), cleanHtml),
		background_image: nullable(string())
	})
);

export type StudentsOverview = InferOutput<typeof StudentsOverview>;

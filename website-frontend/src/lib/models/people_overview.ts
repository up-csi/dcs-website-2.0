import { cleanHtml } from '$lib/models-helpers';
import { nullable, object, partial, pipe, string, type InferOutput } from 'valibot';

export const PeopleOverview = partial(
	object({
		flexible_content: nullable(pipe(string(), cleanHtml)),
		background_image: nullable(string())
	})
);

export type PeopleOverview = InferOutput<typeof PeopleOverview>;

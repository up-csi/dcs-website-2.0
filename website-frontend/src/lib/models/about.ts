import { cleanHtml } from '$lib/models-helpers';
import { object, partial, pipe, string, type InferOutput } from 'valibot';

export const About = partial(
	object({
		flexible_content: pipe(string(), cleanHtml)
	})
);

export type About = InferOutput<typeof About>;

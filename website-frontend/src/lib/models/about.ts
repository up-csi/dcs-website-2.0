import { cleanHtml } from '$lib/models-helpers';
import { object, pipe, string, type InferOutput } from 'valibot';

export const About = object({
	flexible_content: pipe(string(), cleanHtml)
});

export type About = InferOutput<typeof About>;

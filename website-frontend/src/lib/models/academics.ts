import { cleanHtml } from '$lib/models-helpers';
import { object, pipe, string, type InferOutput } from 'valibot';

export const Academics = object({
	flexible_content: pipe(string(), cleanHtml)
});

export type Academics = InferOutput<typeof Academics>;

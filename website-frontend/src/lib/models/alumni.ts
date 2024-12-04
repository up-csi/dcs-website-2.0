import { cleanHtml } from '$lib/models-helpers';
import { object, pipe, string, type InferOutput } from 'valibot';

export const Alumni = object({
	flexible_content: pipe(string(), cleanHtml)
});

export type Alumni = InferOutput<typeof Alumni>;

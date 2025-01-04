import { cleanHtml } from '$lib/models-helpers';
import { object, pipe, string, type InferOutput } from 'valibot';

export const Linkages = object({
	flexible_content: pipe(string(), cleanHtml)
});

export type Linkages = InferOutput<typeof Linkages>;

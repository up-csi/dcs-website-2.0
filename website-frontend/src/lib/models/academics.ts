import { cleanHtml } from '$lib/models-helpers';
import { object, partial, pipe, string, type InferOutput } from 'valibot';

export const Academics = partial(
	object({
		flexible_content: pipe(string(), cleanHtml)
	})
);

export type Academics = InferOutput<typeof Academics>;

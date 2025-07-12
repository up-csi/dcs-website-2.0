import { cleanHtml } from '$lib/models-helpers';
import { array, nullable, object, partial, pipe, string, type InferOutput } from 'valibot';

export const AboutPage = partial(
	object({
		title: string(),
		slug: string(),
		flexible_content: pipe(string(), cleanHtml),
		background_image: nullable(string())
	})
);

export const AboutPages = array(AboutPage);

export type AboutPage = InferOutput<typeof AboutPage>;
export type AboutPages = InferOutput<typeof AboutPages>;

import { cleanHtml } from '$lib/models-helpers';
import { array, boolean, nullable, object, partial, pipe, string, type InferOutput } from 'valibot';

export const MiscellaneousPage = partial(
	object({
		title: string(),
		slug: string(),
		is_on_nav: boolean(),
		flexible_content: pipe(string(), cleanHtml),
		background_image: nullable(string())
	})
);

export const MiscellaneousPages = array(MiscellaneousPage);

export type MiscellaneousPage = InferOutput<typeof MiscellaneousPage>;
export type MiscellaneousPages = InferOutput<typeof MiscellaneousPages>;

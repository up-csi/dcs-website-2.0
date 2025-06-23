import { cleanHtml } from '$lib/models-helpers';
import { array, boolean, number, object, partial, pipe, string, type InferOutput } from 'valibot';

export const MiscellaneousPage = partial(
	object({
		title: string(),
		slug: string(),
        sort: number(),
        is_on_nav: boolean(),
		flexible_content: pipe(string(), cleanHtml)
	})
);

export const MiscellaneousPages = array(MiscellaneousPage);

export type MiscellaneousPage = InferOutput<typeof MiscellaneousPage>;
export type MiscellaneousPages = InferOutput<typeof MiscellaneousPages>;

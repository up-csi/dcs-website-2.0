import { cleanHtml } from '$lib/models-helpers';
import { object, pipe, string, nullable, type InferOutput, partial } from 'valibot';

export const PartnershipsOverview = partial(
	object({
		flexible_content: pipe(string(), cleanHtml),
		background_image: nullable(string())
	})
);

export type PartnershipsOverview = InferOutput<typeof PartnershipsOverview>;

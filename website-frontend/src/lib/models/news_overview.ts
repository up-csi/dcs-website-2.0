import { nullable, object, partial, string, type InferOutput } from 'valibot';

export const NewsOverview = partial(
	object({
		background_image: nullable(string())
	})
);

export type NewsOverview = InferOutput<typeof NewsOverview>;

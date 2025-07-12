import { nullable, object, partial, string, type InferOutput } from 'valibot';

export const Research = partial(
	object({
		background_image: nullable(string())
	})
);

export type Research = InferOutput<typeof Research>;

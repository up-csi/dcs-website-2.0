import { array, nullable, object, partial, string, type InferOutput } from 'valibot';

export const Partnership = partial(
	object({
		name: string(),
		display_image: nullable(string()),
		email: nullable(string()),
		website: nullable(string()),
		description: nullable(string())
	})
);

export const Partnerships = array(Partnership);

export type Partnership = InferOutput<typeof Partnership>;
export type Partnerships = InferOutput<typeof Partnerships>;

import { nullish, object, string, type InferOutput } from 'valibot';

export const Global = object({
	title: string(),
	description: string(),
	favicon: nullish(string())
});

export type Global = InferOutput<typeof Global>;

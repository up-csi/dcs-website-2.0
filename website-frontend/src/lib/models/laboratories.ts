import { array, nullable, object, string, type InferOutput } from 'valibot';

export const Laboratory = object({
	id: string(),
	name: string(),
	slug: string(),
	description: nullable(string()),
	logo: nullable(string()),
	location: nullable(string()),
	contact_email: nullable(string())
});

export const Laboratories = array(Laboratory);

export type Laboratory = InferOutput<typeof Laboratory>;
export type Laboratories = InferOutput<typeof Laboratories>;

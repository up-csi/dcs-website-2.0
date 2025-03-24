import { array, object, string, nullable, type InferOutput, optional } from 'valibot';

export const Accolade = object({
	name: string()
});

export const Alum = object({
	id: string(),
	first_name: string(),
	last_name: string(),
	title: nullable(string()),
	description: nullable(string()),
	batch: string(),
	profile_image: optional(nullable(string())),
	background_image: optional(nullable(string())),
	accolade: optional(nullable(array(Accolade)))
});

export const Alumni = array(Alum);

export type Accolade = InferOutput<typeof Accolade>;
export type Alum = InferOutput<typeof Alum>;
export type Alumnis = InferOutput<typeof Alumni>;

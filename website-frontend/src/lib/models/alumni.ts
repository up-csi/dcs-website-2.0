import { array, object, string, nullable, type InferOutput, partial, number } from 'valibot';

export const Accolade = partial(
	object({
		name: string()
	})
);

export const Alum = partial(
	object({
		id: number(),
		first_name: string(),
		last_name: string(),
		title: nullable(string()),
		description: nullable(string()),
		batch: string(),
		profile_image: nullable(string()),
		background_image: nullable(string()),
		accolade: nullable(array(Accolade))
	})
);

export const Alumni = array(Alum);

export type Accolade = InferOutput<typeof Accolade>;
export type Alum = InferOutput<typeof Alum>;
export type Alumnis = InferOutput<typeof Alumni>;

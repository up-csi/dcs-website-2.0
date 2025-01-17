import { array, object, string, nullable, type InferOutput, pipe, isoDate } from 'valibot';

export const Organization = object({
	name: string(),
	slug: string(),
	description: nullable(string()),
	mission: nullable(string()),
	email: nullable(string()),
	founding_date: nullable(pipe(string(), isoDate())),
	logo: nullable(string()),
	website: nullable(string())
});

export const Organizations = array(Organization);

export type Organization = InferOutput<typeof Organization>;
export type Organizations = InferOutput<typeof Organizations>;

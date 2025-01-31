import { array, object, string, nullable, type InferOutput, pipe, isoDate } from 'valibot';

export const StudentsOrganization = object({
	name: string(),
	slug: string(),
	description: nullable(string()),
	mission: nullable(string()),
	email: nullable(string()),
	founding_date: nullable(pipe(string(), isoDate())),
	logo: nullable(string()),
	website: nullable(string())
});

export const StudentsOrganizations = array(StudentsOrganization);

export type StudentsOrganization = InferOutput<typeof StudentsOrganization>;
export type StudentsOrganizations = InferOutput<typeof StudentsOrganizations>;

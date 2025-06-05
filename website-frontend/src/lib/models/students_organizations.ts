import { cleanHtmlDark } from '$lib/models-helpers';
import {
	array,
	object,
	string,
	nullable,
	type InferOutput,
	pipe,
	isoDate,
	union,
	lazy,
	partial,
	number
} from 'valibot';
import { StudentsOrganizationsDirectusFiles } from './junctions/students_organizations_directus_files';

export const StudentsOrganization = partial(
	object({
		name: string(),
		slug: string(),
		description: nullable(string()),
		mission: nullable(string()),
		email: nullable(string()),
		founding_date: nullable(pipe(string(), isoDate())),
		logo: nullable(string()),
		website: nullable(string()),
		location: nullable(string()),
		flexible_content: pipe(string(), cleanHtmlDark),
		background_images: nullable(
			union([array(number()), lazy(() => StudentsOrganizationsDirectusFiles)])
		)
	})
);

export const StudentsOrganizations = array(StudentsOrganization);

export type StudentsOrganization = InferOutput<typeof StudentsOrganization>;
export type StudentsOrganizations = InferOutput<typeof StudentsOrganizations>;

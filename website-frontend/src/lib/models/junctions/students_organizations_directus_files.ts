import { array, lazy, number, object, partial, string, union, type GenericSchema } from 'valibot';
import { StudentsOrganization } from '../students_organizations';
import { DirectusFile } from '../directus_files';

export type StudentsOrganizationsDirectusFiles = {
	students_organizations_id?: number | StudentsOrganization;
	directus_files_id?: string | DirectusFile;
}[];

export const StudentsOrganizationsDirectusFiles: GenericSchema<StudentsOrganizationsDirectusFiles> =
	array(
		partial(
			object({
				students_organizations_id: union([number(), lazy(() => StudentsOrganization)]),
				directus_files_id: union([string(), lazy(() => DirectusFile)])
			})
		)
	);

import { array, lazy, object, string, union, type GenericSchema } from 'valibot';
import { StudentsOrganization } from '../students_organizations';
import { DirectusFile } from '../directus_files';

export type StudentsOrganizationsDirectusFiles = {
	laboratories_id: string | StudentsOrganization;
	directus_files_id: string | DirectusFile;
}[];

export const StudentsOrganizationsDirectusFiles: GenericSchema<StudentsOrganizationsDirectusFiles> =
	array(
		object({
			laboratories_id: union([string(), lazy(() => StudentsOrganization)]),
			directus_files_id: union([string(), lazy(() => DirectusFile)])
		})
	);

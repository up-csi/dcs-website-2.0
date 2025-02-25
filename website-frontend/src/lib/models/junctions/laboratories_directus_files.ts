import { array, lazy, object, string, union, type GenericSchema } from 'valibot';
import { Laboratory } from '../laboratories';
import { DirectusFile } from '../directus_files';

export type LaboratoriesDirectusFiles = {
	laboratories_id: string | Laboratory;
	directus_files_id: string | DirectusFile;
}[];

export const LaboratoriesDirectusFiles: GenericSchema<LaboratoriesDirectusFiles> = array(
	object({
		laboratories_id: union([string(), lazy(() => Laboratory)]),
		directus_files_id: union([string(), lazy(() => DirectusFile)])
	})
);

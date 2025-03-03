import { array, lazy, nullable, object, string, union, type InferOutput } from 'valibot';
import { LaboratoriesDirectusFiles } from './junctions/laboratories_directus_files';
import { PeopleLaboratories } from './junctions/people_laboratories';

export const Laboratory = object({
	id: string(),
	name: string(),
	slug: string(),
	brief_description: string(),
	description: nullable(string()),
	logo: nullable(string()),
	location: nullable(string()),
	contact_email: nullable(string()),
	background_images: union([array(string()), lazy(() => LaboratoriesDirectusFiles)]),
	affiliates: union([array(string()), lazy(() => PeopleLaboratories)])
});

export const Laboratories = array(Laboratory);

export type Laboratory = InferOutput<typeof Laboratory>;
export type Laboratories = InferOutput<typeof Laboratories>;

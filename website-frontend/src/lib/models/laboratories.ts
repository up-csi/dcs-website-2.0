import {
	array,
	lazy,
	nullable,
	number,
	object,
	partial,
	string,
	union,
	type InferOutput
} from 'valibot';
import { LaboratoriesDirectusFiles } from './junctions/laboratories_directus_files';
import { PeopleLaboratories } from './junctions/people_laboratories';
import { EventsLaboratories } from './junctions/events_laboratories';

export const Laboratory = partial(
	object({
		id: string(),
		name: string(),
		slug: string(),
		brief_description: nullable(string()),
		description: nullable(string()),
		logo: nullable(string()),
		location: nullable(string()),
		contact_email: nullable(string()),
		background_images: nullable(union([array(number()), lazy(() => LaboratoriesDirectusFiles)])),
		affiliates: nullable(union([array(string()), lazy(() => PeopleLaboratories)])),
		events: nullable(union([array(string()), lazy(() => EventsLaboratories)]))
	})
);

export const Laboratories = array(Laboratory);

export type Laboratory = InferOutput<typeof Laboratory>;
export type Laboratories = InferOutput<typeof Laboratories>;

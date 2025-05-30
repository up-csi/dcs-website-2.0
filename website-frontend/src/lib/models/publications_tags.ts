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
import { PublicationsRelated } from './junctions/publications_related';

export const PublicationsTag = partial(
	object({
		name: string(),
		related_publications: nullable(union([array(number()), lazy(() => PublicationsRelated)]))
	})
);

export const PublicationsTags = array(PublicationsTag);

export type PublicationsTag = InferOutput<typeof PublicationsTag>;
export type PublicationsTags = InferOutput<typeof PublicationsTags>;

import { array, lazy, object, optional, string, union, type InferOutput } from 'valibot';
import { PublicationsRelated } from './junctions/publications_related';

export const PublicationsTag = object({
	name: string(),
	related_publications: optional(union([array(string()), lazy(() => PublicationsRelated)]))
});

export const PublicationsTags = array(PublicationsTag);

export type PublicationsTag = InferOutput<typeof PublicationsTag>;
export type PublicationsTags = InferOutput<typeof PublicationsTags>;

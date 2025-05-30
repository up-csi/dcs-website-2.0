import { array, lazy, object, partial, string, union, type GenericSchema } from 'valibot';
import { Publication } from '../publications';
import { PublicationsTag } from '../publications_tags';

export type PublicationsRelated = {
	publications_id?: string | Publication;
	publications_tags_id?: string | PublicationsTag;
}[];

export const PublicationsRelated: GenericSchema<PublicationsRelated> = array(
	partial(
		object({
			publications_id: union([string(), lazy(() => Publication)]),
			publications_tags_id: union([string(), lazy(() => PublicationsTag)])
		})
	)
);

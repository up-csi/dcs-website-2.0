import { array, lazy, object, partial, string, union, type GenericSchema } from 'valibot';
import { Person } from '../people';
import { Publication } from '../publications';

export type PeoplePublications = {
	people_id?: string | Person;
	publications_id?: string | Publication;
}[];

export const PeoplePublications: GenericSchema<PeoplePublications> = array(
	partial(
		object({
			people_id: union([string(), lazy(() => Person)]),
			publications_id: union([string(), lazy(() => Publication)])
		})
	)
);

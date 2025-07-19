import { array, lazy, number, object, partial, string, union, type GenericSchema } from 'valibot';
import { Person } from '../people';
import { Level } from '../people_levels';

export type PeopleRelated = {
	people_id?: string | Person;
	people_levels_id?: number | Level;
}[];

export const PeopleRelated: GenericSchema<PeopleRelated> = array(
	partial(
		object({
			people_id: union([string(), lazy(() => Person)]),
			people_levels_id: union([number(), lazy(() => Level)])
		})
	)
);

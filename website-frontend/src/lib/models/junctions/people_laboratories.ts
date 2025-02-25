import { array, lazy, object, string, union, type GenericSchema } from 'valibot';
import { Person } from '../people';
import { Laboratory } from '../laboratories';

export type PeopleLaboratories = {
	role: string;
	people_id: string | Person;
	laboratories_id: string | Laboratory;
}[];

export const PeopleLaboratories: GenericSchema<PeopleLaboratories> = array(
	object({
		role: string(),
		people_id: union([string(), lazy(() => Person)]),
		laboratories_id: union([string(), lazy(() => Laboratory)])
	})
);

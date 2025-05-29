import {
	array,
	object,
	string,
	nullable,
	type InferOutput,
	lazy,
	union,
	partial,
	number
} from 'valibot';
import { PeopleLaboratories } from './junctions/people_laboratories';
import { PeoplePublications } from './junctions/people_publications';

export const EducationalAttainment = partial(
	object({
		degree: string(),
		status: string(),
		institution: string(),
		start_date: nullable(string()),
		end_date: nullable(string())
	})
);

export const Person = partial(
	object({
		id: string(),
		first_name: string(),
		last_name: string(),
		position: string(),
		email: nullable(string()),
		telephone: nullable(string()),
		website: nullable(string()),
		location: nullable(string()),
		category: string(),
		profile_image: nullable(string()),
		background_image: nullable(string()),
		interests: nullable(string()),
		awards: nullable(string()),
		educational_attainment: nullable(array(EducationalAttainment)),
		username: string(),
		affiliations: nullable(union([array(string()), lazy(() => PeopleLaboratories)])),
		publications: nullable(union([array(number()), lazy(() => PeoplePublications)]))
	})
);

export const People = array(Person);

export type EducationalAttainment = InferOutput<typeof EducationalAttainment>;
export type Person = InferOutput<typeof Person>;
export type Peoples = InferOutput<typeof People>;

import { array, object, string, nullable, type InferOutput, optional, lazy, union } from 'valibot';
import { PeopleLaboratories } from './junctions/people_laboratories';
import { PeoplePublications } from './junctions/people_publications';

export const EducationalAttainment = object({
	degree: string(),
	status: string(),
	institution: string(),
	start_date: optional(nullable(string())),
	end_date: optional(nullable(string()))
});

export const Person = object({
	id: string(),
	first_name: string(),
	last_name: string(),
	position: string(),
	email: optional(nullable(string())),
	location: optional(nullable(string())),
	category: string(),
	profile_image: optional(nullable(string())),
	background_image: optional(nullable(string())),
	interests: optional(nullable(string())),
	educational_attainment: optional(nullable(array(EducationalAttainment))),
	username: string(),
	affiliations: union([array(string()), lazy(() => PeopleLaboratories)]),
	publications: union([array(string()), lazy(() => PeoplePublications)])
});

export const People = array(Person);

export type EducationalAttainment = InferOutput<typeof EducationalAttainment>;
export type Person = InferOutput<typeof Person>;
export type Peoples = InferOutput<typeof People>;

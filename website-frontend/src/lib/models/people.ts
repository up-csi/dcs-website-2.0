import { array, object, string, nullable, type InferOutput, optional } from 'valibot';

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
	username: string()
});

export const People = array(Person);

export type EducationalAttainment = InferOutput<typeof EducationalAttainment>;
export type Person = InferOutput<typeof Person>;
export type Peoples = InferOutput<typeof People>;

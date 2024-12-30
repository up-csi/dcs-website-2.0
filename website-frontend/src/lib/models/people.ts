import { array, object, string, type InferOutput } from 'valibot';

export const Person = object({
	id: string(),
	first_name: string(),
	last_name: string(),
	position: string(),
    category: string(),
});

export const People = array(Person);

export type Person = InferOutput<typeof Person>;
export type Peoples = InferOutput<typeof People>;

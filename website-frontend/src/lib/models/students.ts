import { array, object, string, type InferOutput } from 'valibot';

export const Student = object({
	id: string()
});

export const Students = array(Student);

export type Student = InferOutput<typeof Student>;
export type Students = InferOutput<typeof Students>;

import {
	array,
	integer,
	lazy,
	nullable,
	number,
	object,
	partial,
	pipe,
	string,
	union,
	type InferOutput
} from 'valibot';
import { AcademicsProgramsCourses } from './junctions/academics_programs_courses';

export const AcademicsCourse = partial(
	object({
		course_code: string(),
		course_title: string(),
		course_units: pipe(number(), integer()),
		course_description: nullable(string()),
		related_academics_programs: union([array(number()), lazy(() => AcademicsProgramsCourses)])
	})
);

export const AcademicsCourses = array(AcademicsCourse);

export type AcademicsCourse = InferOutput<typeof AcademicsCourse>;
export type AcademicsCourses = InferOutput<typeof AcademicsCourses>;

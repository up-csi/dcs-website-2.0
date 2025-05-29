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
	type GenericSchema
} from 'valibot';
import { AcademicsProgram } from '../academics_programs';
import { AcademicsCourse } from '../academics_courses';

export type AcademicsProgramsCourses = {
	year?: number | null;
	semester?: string | null;
	academics_programs_id?: string | AcademicsProgram;
	academics_courses_course_code?: string | AcademicsCourse;
}[];

export const AcademicsProgramsCourses: GenericSchema<AcademicsProgramsCourses> = array(
	partial(
		object({
			year: nullable(pipe(number(), integer())),
			semester: nullable(string()),
			academics_programs_id: union([string(), lazy(() => AcademicsProgram)]),
			academics_courses_course_code: union([string(), lazy(() => AcademicsCourse)])
		})
	)
);

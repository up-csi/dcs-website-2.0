import {
	array,
	integer,
	lazy,
	number,
	object,
	pipe,
	string,
	union,
	type GenericSchema
} from 'valibot';
import { AcademicsProgram } from '../academics_programs';
import { AcademicsCourse } from '../academics_courses';

export type AcademicsProgramsCourses = {
	year: number;
	semester: string;
	academics_programs_id: string | AcademicsProgram;
	academics_courses_course_code: string | AcademicsCourse;
}[];

export const AcademicsProgramsCourses: GenericSchema<AcademicsProgramsCourses> = array(
	object({
		year: pipe(number(), integer()),
		semester: string(),
		academics_programs_id: union([string(), lazy(() => AcademicsProgram)]),
		academics_courses_course_code: union([string(), lazy(() => AcademicsCourse)])
	})
);

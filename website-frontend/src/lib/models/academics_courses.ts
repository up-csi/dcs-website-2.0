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
import { AcademicsCoursesPrerequisites } from './junctions/academics_courses_prerequisites';
import { AcademicsCoursesCorequisites } from './junctions/academics_courses_corequisites';

export const AcademicsCourse = partial(
	object({
		course_code: string(),
		course_title: string(),
		course_units: pipe(number(), integer()),
		course_description: nullable(string()),
		course_syllabus: nullable(string()),
		course_prerequisites: nullable(
			union([array(number()), lazy(() => AcademicsCoursesPrerequisites)])
		),
		course_corequisites: nullable(
			union([array(number()), lazy(() => AcademicsCoursesCorequisites)])
		),
		related_academics_programs: nullable(
			union([array(number()), lazy(() => AcademicsProgramsCourses)])
		)
	})
);

export const AcademicsCourses = array(AcademicsCourse);

export type AcademicsCourse = InferOutput<typeof AcademicsCourse>;
export type AcademicsCourses = InferOutput<typeof AcademicsCourses>;

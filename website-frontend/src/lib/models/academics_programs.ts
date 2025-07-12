import {
	array,
	isoDate,
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
import { AcademicsCategory } from './academics_categories';
import { cleanHtml } from '$lib/models-helpers';
import { AcademicsProgramsCourses } from './junctions/academics_programs_courses';

export const AcademicsProgram = partial(
	object({
		title: string(),
		slug: string(),
		category: nullable(union([string(), lazy(() => AcademicsCategory)])),
		flexible_content: pipe(string(), cleanHtml),
		curriculum_table: nullable(union([array(number()), lazy(() => AcademicsProgramsCourses)])),
		curriculum_last_updated: pipe(string(), isoDate()),
		background_image: nullable(string())
	})
);

export const AcademicsPrograms = array(AcademicsProgram);

export type AcademicsProgram = InferOutput<typeof AcademicsProgram>;
export type AcademicsPrograms = InferOutput<typeof AcademicsPrograms>;

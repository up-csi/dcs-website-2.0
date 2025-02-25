import { array, lazy, number, object, pipe, string, union, type InferOutput } from 'valibot';
import { AcademicsCategory } from './academics_categories';
import { cleanHtml } from '$lib/models-helpers';
import { AcademicsProgramsCourses } from './junctions/academics_programs_courses';

export const AcademicsProgram = object({
	title: string(),
	slug: string(),
	category: union([string(), lazy(() => AcademicsCategory)]),
	flexible_content: pipe(string(), cleanHtml),
	curriculum_table: union([array(number()), lazy(() => AcademicsProgramsCourses)])
});

export const AcademicsPrograms = array(AcademicsProgram);

export type AcademicsProgram = InferOutput<typeof AcademicsProgram>;
export type AcademicsPrograms = InferOutput<typeof AcademicsPrograms>;

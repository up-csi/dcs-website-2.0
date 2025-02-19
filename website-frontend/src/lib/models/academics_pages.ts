import { cleanHtml } from '$lib/models-helpers';
import { array, lazy, object, pipe, string, union, type InferOutput } from 'valibot';
import { AcademicsCategory } from './academics_categories';

export const AcademicsPage = object({
	title: string(),
	slug: string(),
	category: union([string(), lazy(() => AcademicsCategory)]),
	flexible_content: pipe(string(), cleanHtml)
});

export const AcademicsPages = array(AcademicsPage);

export type AcademicsPage = InferOutput<typeof AcademicsPage>;
export type AcademicsPages = InferOutput<typeof AcademicsPages>;

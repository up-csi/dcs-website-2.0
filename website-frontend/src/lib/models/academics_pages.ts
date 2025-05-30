import { cleanHtml } from '$lib/models-helpers';
import {
	array,
	lazy,
	nullable,
	object,
	partial,
	pipe,
	string,
	union,
	type InferOutput
} from 'valibot';
import { AcademicsCategory } from './academics_categories';

export const AcademicsPage = partial(
	object({
		title: string(),
		slug: string(),
		category: nullable(union([string(), lazy(() => AcademicsCategory)])),
		flexible_content: pipe(string(), cleanHtml)
	})
);

export const AcademicsPages = array(AcademicsPage);

export type AcademicsPage = InferOutput<typeof AcademicsPage>;
export type AcademicsPages = InferOutput<typeof AcademicsPages>;

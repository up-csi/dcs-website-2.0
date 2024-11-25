import { cleanHtml } from '$lib/models-helpers';
import { object, pipe, string, type InferOutput } from 'valibot';

export const StudentCouncil = object({
	flexible_content: pipe(string(), cleanHtml)
});

export type StudentCouncil = InferOutput<typeof StudentCouncil>;

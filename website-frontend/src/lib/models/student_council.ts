import { object, string, type InferOutput } from 'valibot';

export const StudentCouncil = object({
	flexible_content: string()
});

export type StudentCouncil = InferOutput<typeof StudentCouncil>;

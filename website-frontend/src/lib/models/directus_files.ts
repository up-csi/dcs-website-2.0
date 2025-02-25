import { array, object, string, type InferOutput } from 'valibot';

export const DirectusFile = object({
	id: string()
});

export const DirectusFiles = array(DirectusFile);

export type DirectusFile = InferOutput<typeof DirectusFile>;
export type DirectusFiles = InferOutput<typeof DirectusFiles>;

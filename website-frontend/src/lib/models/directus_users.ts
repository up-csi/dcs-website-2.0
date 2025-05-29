import { array, object, partial, string, type InferOutput } from 'valibot';

export const DirectusUser = partial(
	object({
		id: string(),
		first_name: string(),
		last_name: string()
	})
);

export const DirectusUsers = array(DirectusUser);

export type DirectusUser = InferOutput<typeof DirectusUser>;
export type DirectusUsers = InferOutput<typeof DirectusUsers>;

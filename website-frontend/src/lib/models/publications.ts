import { array, isoDate, nullable, object, pipe, string, type InferOutput } from 'valibot';

const Author = object({
	first_name: string(),
	last_name: string()
});

const AccessLink = object({
	url: string()
});

export const Publication = object({
	id: string(),
	title: string(),
	publish_date: nullable(pipe(string(), isoDate())),
	authors: array(Author),
	abstract: string(),
	laboratory: string(),
	hero_image: string(),
	publication_tag: nullable(array(string())),
	access_links: nullable(array(AccessLink))
});

export const Publications = array(Publication);

export type Author = InferOutput<typeof Author>;
export type AccessLink = InferOutput<typeof AccessLink>;
export type Publication = InferOutput<typeof Publication>;
export type Publications = InferOutput<typeof Publications>;

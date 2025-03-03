import {
	array,
	isoDate,
	lazy,
	nullable,
	object,
	pipe,
	string,
	union,
	type InferOutput
} from 'valibot';
import { Laboratory } from './laboratories';

const Author = object({
	first_name: string(),
	last_name: string(),
	link: union([
		object({
			key: string()
		}),
		string()
	])
});

const AccessLink = object({
	url: string(),
	display: string()
});

export const Publication = object({
	id: string(),
	title: string(),
	publish_date: nullable(pipe(string(), isoDate())),
	authors: array(Author),
	abstract: string(),
	laboratory: union([string(), lazy(() => Laboratory)]),
	hero_image: string(),
	publication_tag: nullable(array(string())),
	access_links: nullable(array(AccessLink))
});

export const Publications = array(Publication);

export type Author = InferOutput<typeof Author>;
export type AccessLink = InferOutput<typeof AccessLink>;
export type Publication = InferOutput<typeof Publication>;
export type Publications = InferOutput<typeof Publications>;

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
import { PublicationsRelated } from './junctions/publications_related';

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
	publication_tags: nullable(union([array(string()), lazy(() => PublicationsRelated)])),
	access_links: nullable(array(AccessLink))
});

export const Publications = array(Publication);

export type Author = InferOutput<typeof Author>;
export type AccessLink = InferOutput<typeof AccessLink>;
export type Publication = InferOutput<typeof Publication>;
export type Publications = InferOutput<typeof Publications>;

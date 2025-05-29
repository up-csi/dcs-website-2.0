import {
	array,
	isoDate,
	lazy,
	nullable,
	number,
	object,
	partial,
	pipe,
	string,
	union,
	type InferOutput
} from 'valibot';
import { Laboratory } from './laboratories';
import { PublicationsRelated } from './junctions/publications_related';

const Author = partial(
	object({
		first_name: string(),
		last_name: string(),
		link: object({
			key: string()
		})
	})
);

const AccessLink = partial(
	object({
		url: string(),
		display: nullable(string())
	})
);

export const Publication = partial(
	object({
		id: string(),
		title: string(),
		publish_date: nullable(pipe(string(), isoDate())),
		authors: array(Author),
		abstract: string(),
		laboratory: union([string(), lazy(() => Laboratory)]),
		hero_image: string(),
		publication_tags: nullable(union([array(number()), lazy(() => PublicationsRelated)])),
		access_links: nullable(array(AccessLink))
	})
);

export const Publications = array(Publication);

export type Author = InferOutput<typeof Author>;
export type AccessLink = InferOutput<typeof AccessLink>;
export type Publication = InferOutput<typeof Publication>;
export type Publications = InferOutput<typeof Publications>;

import { cleanHtml } from '$lib/models-helpers';
import {
	array,
	isoTimestamp,
	lazy,
	nullable,
	number,
	object,
	partial,
	pipe,
	required,
	string,
	union,
	type InferOutput
} from 'valibot';
import { DirectusUser } from './directus_users';
import { NewsRelated } from './junctions/news_related';

export const NewsItem = partial(
	object({
		id: string(),
		slug: string(),
		user_created: union([
			string(),
			lazy(() => required(DirectusUser, ['first_name', 'last_name']))
		]),
		user_updated: nullable(
			union([string(), lazy(() => required(DirectusUser, ['first_name', 'last_name']))])
		),
		date_created: pipe(string(), isoTimestamp()),
		date_updated: nullable(pipe(string(), isoTimestamp())),
		title: string(),
		summary: nullable(string()),
		flexible_content: pipe(string(), cleanHtml),
		background_image: nullable(string()),
		news_tags: nullable(union([array(number()), lazy(() => NewsRelated)]))
	})
);

export const News = array(NewsItem);

export type NewsItem = InferOutput<typeof NewsItem>;
export type News = InferOutput<typeof News>;

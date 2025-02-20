import { cleanHtml } from '$lib/models-helpers';
import { array, isoTimestamp, lazy, object, pick, pipe, string, type InferOutput } from 'valibot';
import { DirectusUser } from './directus_users';

export const NewsItem = object({
	id: string(),
	slug: string(),
	user_created: pick(DirectusUser, ['first_name', 'last_name']),
	user_updated: pick(DirectusUser, ['first_name', 'last_name']),
	date_created: pipe(string(), isoTimestamp()),
	date_updated: pipe(string(), isoTimestamp()),
	title: string(),
	summary: string(),
	flexible_content: pipe(string(), cleanHtml)
});

export const News = array(NewsItem);

export type NewsItem = InferOutput<typeof NewsItem>;
export type News = InferOutput<typeof News>;

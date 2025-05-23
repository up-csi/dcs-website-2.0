import { array, lazy, object, optional, string, union, type InferOutput } from 'valibot';
import { NewsRelated } from './junctions/news_related';

export const NewsTag = object({
	name: string(),
	related_news: optional(union([array(string()), lazy(() => NewsRelated)]))
});

export const NewsTags = array(NewsTag);

export type NewsTag = InferOutput<typeof NewsTag>;
export type NewsTags = InferOutput<typeof NewsTags>;

import {
	array,
	lazy,
	nullable,
	number,
	object,
	partial,
	string,
	union,
	type InferOutput
} from 'valibot';
import { NewsRelated } from './junctions/news_related';

export const NewsTag = partial(
	object({
		name: string(),
		related_news: nullable(union([array(number()), lazy(() => NewsRelated)]))
	})
);

export const NewsTags = array(NewsTag);

export type NewsTag = InferOutput<typeof NewsTag>;
export type NewsTags = InferOutput<typeof NewsTags>;

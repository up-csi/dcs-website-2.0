import { array, lazy, object, string, union, type GenericSchema } from 'valibot';
import { NewsItem } from '../news';
import { NewsTag } from '../news_tags';

export type NewsRelated = {
	news_id: string | NewsItem;
	news_tags_id: string | NewsTag;
}[];

export const NewsRelated: GenericSchema<NewsRelated> = array(
	object({
		news_id: union([string(), lazy(() => NewsItem)]),
		news_tags_id: union([string(), lazy(() => NewsTag)])
	})
);

import { array, lazy, object, string, union, type GenericSchema } from 'valibot';
import { NewsItem } from '../news';

export type FeaturedNews = {
	news_id: string | NewsItem;
}[];

export const FeaturedNews: GenericSchema<FeaturedNews> = array(
	object({
		news_id: union([string(), lazy(() => NewsItem)])
	})
);

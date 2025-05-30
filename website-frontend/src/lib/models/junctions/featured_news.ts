import { array, lazy, object, partial, string, union, type GenericSchema } from 'valibot';
import { NewsItem } from '../news';

export type FeaturedNews = {
	news_id?: string | NewsItem;
}[];

export const FeaturedNews: GenericSchema<FeaturedNews> = array(
	partial(
		object({
			news_id: union([string(), lazy(() => NewsItem)])
		})
	)
);

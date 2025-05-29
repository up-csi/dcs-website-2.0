import { array, lazy, object, partial, string, union, type GenericSchema } from 'valibot';
import { NewsItem } from '../news';

export type RecentNews = {
	news_id?: string | NewsItem;
}[];

export const RecentNews: GenericSchema<RecentNews> = array(
	partial(
		object({
			news_id: union([string(), lazy(() => NewsItem)])
		})
	)
);

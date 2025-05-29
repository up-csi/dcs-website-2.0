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
import { FeaturedNews } from './junctions/featured_news';
import { RecentNews } from './junctions/recent_news';
import { RecentEvents } from './junctions/recent_events';

export const Home = partial(
	object({
		id: string(),
		featured_news: nullable(union([array(number()), lazy(() => FeaturedNews)])),
		recent_news: nullable(union([array(number()), lazy(() => RecentNews)])),
		recent_events: nullable(union([array(number()), lazy(() => RecentEvents)]))
	})
);

export type Home = InferOutput<typeof Home>;

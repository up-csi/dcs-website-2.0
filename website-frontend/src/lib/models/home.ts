import { array, lazy, number, object, string, union, type InferOutput } from 'valibot';
import { FeaturedNews } from './junctions/featured_news';
import { RecentNews } from './junctions/recent_news';
import { RecentEvents } from './junctions/recent_events';

export const Home = object({
	id: string(),
	featured_news: union([array(string()), lazy(() => FeaturedNews)]),
	recent_news: union([array(string()), lazy(() => RecentNews)]),
	recent_events: union([array(number()), lazy(() => RecentEvents)])
});

export type Home = InferOutput<typeof Home>;

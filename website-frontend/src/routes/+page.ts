/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		title: data.global.title,
		description: data.global.description,
		news: data.news,
		featured_news: data.home.featured_news
			.filter((item) => typeof item !== 'string')
			.map((item) => item.news_id),
		recent_news: data.home.recent_news
			.filter((item) => typeof item !== 'string')
			.map((item) => item.news_id),
		recent_events: data.home.recent_events
			.filter((item) => typeof item !== 'number')
			.map((item) => item.events_id)
	};
}

/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		featured_news: data.featured_news,
		recent_news: data.recent_news,
		recent_events: data.recent_events
	};
}

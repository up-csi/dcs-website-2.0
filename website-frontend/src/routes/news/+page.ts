/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		news_overview: data.news_overview,
		news_limit: data.news_limit,
		news_count: data.news_count,
		news: data.news
	};
}

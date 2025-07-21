/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		news_count: data.news_count,
		events_count: data.events_count,
		people_count: data.people_count,
		laboratories_count: data.laboratories_count,
		publications_count: data.publications_count,
		news: data.news,
		events: data.events,
		people: data.people,
		laboratories: data.laboratories,
		publications: data.publications
	};
}

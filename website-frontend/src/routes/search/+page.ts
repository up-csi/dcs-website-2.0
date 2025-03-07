/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		news: data.news,
		events: data.events,
		people: data.people,
		laboratories: data.laboratories,
		publications: data.publications
	};
}

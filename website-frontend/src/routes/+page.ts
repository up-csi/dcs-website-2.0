/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		title: data.global.title,
		description: data.global.description,
		news: data.news,
		events: data.events
	};
}

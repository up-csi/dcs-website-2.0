/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		people: data.people,
		people_overview: data.people_overview,
		position_filters: data.position_filters
	};
}

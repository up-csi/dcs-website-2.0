/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		events_overview: data.events_overview,
		events: data.events,
		location_filters: data.location_filters,
		discipline_filters: data.discipline_filters
	};
}

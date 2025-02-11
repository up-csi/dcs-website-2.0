/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		events: data.events,
		location_filters: data.location_filters,
		discipline_filters: data.discipline_filters
	};
}

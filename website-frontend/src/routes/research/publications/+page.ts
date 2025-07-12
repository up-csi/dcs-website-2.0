/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		research: data.research,
		publications: data.publications,
		years_filters: data.years_filters,
		laboratories_filters: data.laboratories_filters,
		tags_filters: data.tags_filters
	};
}

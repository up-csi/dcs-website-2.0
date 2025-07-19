/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		research: data.research,
		years_filters: data.years_filters,
		laboratories_filters: data.laboratories_filters,
		tags_filters: data.tags_filters,
		publications_count: data.publications_count,
		publications: data.publications
	};
}

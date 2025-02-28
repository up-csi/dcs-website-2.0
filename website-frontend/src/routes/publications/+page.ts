/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		publications: data.publications,
		laboratories_filters: data.laboratories_filters
	};
}

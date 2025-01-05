/** @type {import('./$types').LayoutLoad} */
export async function load({ data }) {
	return {
		events: data.schema.events
	};
}

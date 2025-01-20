/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		events: data.events
	};
}

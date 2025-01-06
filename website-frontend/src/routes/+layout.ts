/** @type {import('./$types').LayoutLoad} */
export async function load({ data }) {
	return {
		title: data.schema.global.title,
		description: data.schema.global.description,
		favicon: data.schema.global.favicon
	};
}

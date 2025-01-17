/** @type {import('./$types').LayoutLoad} */
export async function load({ data }) {
	return {
		title: data.global.title,
		description: data.global.description,
		favicon: data.global.favicon
	};
}

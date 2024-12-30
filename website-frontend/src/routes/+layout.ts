/** @type {import('./$types').LayoutLoad} */
export async function load({ data }) {
	return {
		global: data.schema.global,
		events: data.schema.events,
		student_council: data.schema.student_council,
		alumni: data.schema.alumni,
		assets: data.assets
	};
}

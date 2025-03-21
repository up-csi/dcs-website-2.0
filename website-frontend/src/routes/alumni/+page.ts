/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		alumni: data.alumni,
		alumni_overview: data.alumni_overview
	};
}

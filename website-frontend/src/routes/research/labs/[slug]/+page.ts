/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	return {
		laboratory: data.laboratory,
		publications: data.publications
	};
}

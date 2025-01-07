/** @type {import('./$types').PageServerLoad} */
import getDirectusInstance from '$lib/directus';
import obtainSchema from '$lib/server/schema';

export async function load({ fetch }) {
	const directus = await getDirectusInstance(fetch);

	const keys = ['global', 'events'];
	const schema = await obtainSchema(directus, keys);

	return { schema };
}

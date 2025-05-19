import { redirect } from '@sveltejs/kit';

export function load({ params }) {
	throw redirect(308, `/academics/${params.category}`);
}

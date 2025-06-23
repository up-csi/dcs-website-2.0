/** @type {import('./$types').PageServerLoad} */
import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { error } from '@sveltejs/kit';
import { parse } from 'valibot';
import { MiscellaneousPage, MiscellaneousPages } from '$lib/models/miscellaneous_pages.js';

export async function load({ params, fetch }) {
    const directus = getDirectusInstance(fetch);
    const slug = params.misc;

    const pages = parse(
        MiscellaneousPages,
        await directus.request(
            readItems('miscellaneous_pages', {
                filter: {
                    slug: {
                        _eq: slug
                    }
                }
            })
        )
    );

    if (!pages.length) {
        throw error(404, 'Page not found');
    }

    const page = parse(MiscellaneousPage, pages[0]);

    return {
        page
    };
}

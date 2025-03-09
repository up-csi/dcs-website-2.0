/** @type {import('./$types').PageServerLoad} */
import type { Partners } from '$lib/types/partners';

const partnerships_overview = {
    flexible_content: 'The UP Department of Computer Science has partnered with <b><u>a lot</u></b> of companies and organizations over the years for internships, events, and the like. Our staff and students are trusted by many.'
};

const partners: Partners = [
    {
        src: '',
        name: 'Accenture Philippines',
        description: 'Some company that does company stuff. Description here. Dorime latire ameno. Ameno imperavi.'
    },
    {
        src: '',
        name: 'Accenture Philippines',
        description: 'Some company that does company stuff. Description here. Dorime latire ameno. Ameno imperavi.'
    },
    {
        src: '',
        name: 'Accenture Philippines',
        description: 'Some company that does company stuff. Description here. Dorime latire ameno. Ameno imperavi.'
    },
    {
        src: '',
        name: 'Accenture Philippines',
        description: 'Some company that does company stuff. Description here. Dorime latire ameno. Ameno imperavi.'
    },
];

export async function load() {
    return { partnerships_overview, partners };
}

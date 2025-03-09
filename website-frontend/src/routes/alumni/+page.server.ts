/** @type {import('./$types').PageServerLoad} */
import type { Alumni } from '$lib/types/alumni';

const alumni_overview = {
    flexible_content: 'The UP Department of Computer Science has produced some of the most talented innovators in the field of computing over the years, from young and successful company founders to experienced professors. Here are some of the notable ones!'
};

const alumni: Alumni = [
    {
        batch: 2021,
        img: '',
        name: 'Victor Reyes',
        accolades: [
            'mirror, mirror on the wall, who\'s the skibidiest of them all?',
            'sigma ohio rizzler skrrt skrrt',
            'CEO of What the Sigma'
        ]
    },
    {
        batch: 2021,
        img: '',
        name: 'Victor Reyes',
        accolades: [
            'mirror, mirror on the wall, who\'s the skibidiest of them all?',
            'sigma ohio rizzler skrrt skrrt',
            'CEO of What the Sigma'
        ]
    },
    {
        batch: 2021,
        img: '',
        name: 'Victor Reyes',
        accolades: [
            'mirror, mirror on the wall, who\'s the skibidiest of them all?',
            'sigma ohio rizzler skrrt skrrt',
            'CEO of What the Sigma'
        ]
    },
    {
        batch: 2021,
        img: '',
        name: 'Victor Reyes',
        accolades: [
            'mirror, mirror on the wall, who\'s the skibidiest of them all?',
            'sigma ohio rizzler skrrt skrrt',
            'CEO of What the Sigma'
        ]
    },
    {
        batch: 2021,
        img: '',
        name: 'Victor Reyes',
        accolades: [
            'mirror, mirror on the wall, who\'s the skibidiest of them all?',
            'sigma ohio rizzler skrrt skrrt',
            'CEO of What the Sigma'
        ]
    },
];

export async function load() {
    return { alumni_overview, alumni };
}

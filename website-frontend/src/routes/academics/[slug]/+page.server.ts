import { error } from '@sveltejs/kit';

const programs = [
    {slug: "bs-cs", title:"Bachelor of Science in Computer Science", image:"...", description: "owo", curriculum: "insert curriculum table here"},
    {slug: "ms-cs", title:"Master of Science in Computer Science", image:"...", description: "owo", curriculum: "insert curriculum table here"},
    {slug: "ms-bioinformatics", title:"Master of Science in Bioinformatics", image:"...", description: "owo", curriculum: "insert curriculum table here"},
    {slug: "phd-cs", title:"Doctor of Philosophy in Computer Science", image:"...", description: "owo", curriculum: "insert curriculum table here"},
    ];

export function load({ params }) {
    const program = programs.find((program) => program.slug === params.slug);

    if (!program) error(404);

    return {
        program
    };
}
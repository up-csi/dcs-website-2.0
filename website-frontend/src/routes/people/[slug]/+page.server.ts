import { error } from '@sveltejs/kit';

const people_categories = [
    {slug: "regular-faculty", title:"Regular Faculty Members", image:"...", description: "owo", members:
        [
        {name: "John Villar", position: "king", profile_img: "...", bg_img: "...", lab: "Scientific Computing Laboratory"},
        {name: "John Villar", position: "king", profile_img: "...", bg_img: "...", lab: "Scientific Computing Laboratory"},
        ]
    },
    {slug: "associates", title:"Lecturers & Teaching Associates", image:"...", description: "owo", members:
        [
        {name: "John Villar", position: "king", profile_img: "...", bg_img: "...", lab: "Scientific Computing Laboratory"},
        {name: "John Villar", position: "king", profile_img: "...", bg_img: "...", lab: "Scientific Computing Laboratory"},
        ]
    },
    {slug: "support-staff", title:"Support Staff", image:"...", description: "owo", members:
        [
        {name: "John Villar", position: "king", profile_img: "...", bg_img: "...", lab: "Scientific Computing Laboratory"},
        {name: "John Villar", position: "king", profile_img: "...", bg_img: "...", lab: "Scientific Computing Laboratory"},
        ]
    },
    ];

export function load({ params }) {
    const people_category = people_categories.find((people_category) => people_category.slug === params.slug);

    if (!people_category) error(404);

    return {
        people_category
    };
}
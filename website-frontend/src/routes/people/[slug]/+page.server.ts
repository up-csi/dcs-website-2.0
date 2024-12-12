import { error } from '@sveltejs/kit';

const people_categories = [
    {slug: "regular-faculty", title:"Regular Faculty Members", image:"...", description: "owo", people:
        [
        {name: "John Justine Villar", position: "king", profile_img: "...", bg_img: "...", lab: "Scientific Computing Laboratory"},
        {name: "Justine Villar", position: "queen", profile_img: "...", bg_img: "...", lab: "Scientific Computing Laboratory"},
        {name: "Clarisse Villar", position: "queen", profile_img: "...", bg_img: "...", lab: "Scientific Computing Laboratory"},
        {name: "Cedric Villar", position: "queen never cry", profile_img: "...", bg_img: "...", lab: "Scientific Computing Laboratory ni Dexter in the laboratory"},
        {name: "Victor Villar", position: "queen", profile_img: "...", bg_img: "...", lab: "Scientific Computing Laboratory"},
        ]
    },
    {slug: "associates", title:"Lecturers & Teaching Associates", image:"...", description: "owo", people:
        [
        {name: "John Villar", position: "king", profile_img: "...", bg_img: "...", lab: ""},
        {name: "John Villar", position: "king", profile_img: "...", bg_img: "...", lab: ""},
        ]
    },
    {slug: "support-staff", title:"Support Staff", image:"...", description: "owo", people:
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
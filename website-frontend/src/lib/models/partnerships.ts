import { nullable, object, optional, string } from "valibot";

export const Partnerships = object({
    name: string(),
    display_image: optional(nullable(string())),
    description: string(),
})
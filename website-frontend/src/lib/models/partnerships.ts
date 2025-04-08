import { nullable, object, optional, string, type InferOutput } from "valibot";

export const Partnerships = object({
    name: string(),
    display_image: optional(nullable(string())),
    description: string(),
})

export type Partnerships = InferOutput<typeof Partnerships>;

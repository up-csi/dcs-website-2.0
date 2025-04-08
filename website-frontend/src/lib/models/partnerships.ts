import { array, nullable, object, optional, string, type InferOutput } from "valibot";

export const Partnership = object({
    name: string(),
    display_image: optional(nullable(string())),
    description: string(),
})

export const Partnerships = array(Partnership)

export type Partnership = InferOutput<typeof Partnership>;
export type Partnerships = InferOutput<typeof Partnerships>;

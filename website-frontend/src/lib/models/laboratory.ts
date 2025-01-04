import { array, object, string, type InferOutput } from 'valibot';

export const Laboratory = object({
    name: string(),
    slug: string(),
    description: string(),
    logo: string(),
    location: string(),
    contact_email: string()
});

export const Laboratories = array(Laboratory);

export type Laboratory = InferOutput<typeof Laboratory>;
export type Laboratories = InferOutput<typeof Laboratories>;
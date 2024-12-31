import { array, object, string, type InferOutput } from 'valibot';

export const Laboratory = object({
    id: string(),
    name: string(),
});

export const Laboratories = array(Laboratory);

export type Laboratory = InferOutput<typeof Laboratory>;
export type Laboratories = InferOutput<typeof Laboratories>;
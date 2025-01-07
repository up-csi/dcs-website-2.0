import { array, number, object, string, type InferOutput } from 'valibot';

export const PeopleLaboratory = object({
	id: number(),
	people_id: string(),
	laboratories_id: string()
});

export const PeopleLaboratories = array(PeopleLaboratory);

export type PeopleLaboratory = InferOutput<typeof PeopleLaboratory>;
export type PeopleLaboratories = InferOutput<typeof PeopleLaboratories>;

import { object, type InferOutput } from 'valibot';
import { Events } from './event';
import { Global } from './global';
import { StudentCouncil } from './student_council';

export const Schema = object({
	global: Global,
	events: Events,
	student_council: StudentCouncil
});

export type Schema = InferOutput<typeof Schema>;

import { object, type InferOutput } from 'valibot';
import { Events } from './event';
import { Global } from './global';
import { StudentCouncil } from './student_council';
import { Alumni } from './alumni';

export const Schema = object({
	global: Global,
	events: Events,
	student_council: StudentCouncil,
	alumni: Alumni
});

export type Schema = InferOutput<typeof Schema>;

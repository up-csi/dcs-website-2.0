import { object, type InferOutput } from 'valibot';
import { Events } from './event';
import { Global } from './global';

export const Schema = object({
	global: Global,
	events: Events
});

export type Schema = InferOutput<typeof Schema>;

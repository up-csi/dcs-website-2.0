import { array, object, type InferOutput } from 'valibot';
import { Event } from './event';
import { Global } from './global';

export const Schema = object({
	global: Global,
	events: array(Event)
});

export type Schema = InferOutput<typeof Schema>;

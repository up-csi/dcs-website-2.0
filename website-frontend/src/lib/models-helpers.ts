import sanitize from 'sanitize-html';
import { transform } from 'valibot';

export const cleanHtml = transform((input: string) => sanitize(input));
export const toDateTime = transform((input: string) => {
	return input as 'datetime';
});

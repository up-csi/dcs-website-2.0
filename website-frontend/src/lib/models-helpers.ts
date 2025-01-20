import sanitize from 'sanitize-html';
import { transform } from 'valibot';

export const cleanHtml = transform((input: string) => sanitize(input));
export const toDateTime = transform((input: string) => {
	if (!isNaN(Date.parse(input))) {
		return input as 'datetime';
	}
	return Date.now().toString() as 'datetime';
});

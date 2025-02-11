import sanitize from 'sanitize-html';
import { transform } from 'valibot';

export const cleanHtml = transform((input: string) => sanitize(input));

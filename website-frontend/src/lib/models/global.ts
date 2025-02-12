import { array, intersect, object, string, type InferOutput } from 'valibot';

const Metadata = object({
	title: string(),
	description: string(),
	favicon: string()
});

const Header = object({});

const Footer = object({
	address: array(
		object({
			address_line: string()
		})
	),
	contact_number: string(),
	contact_email: string(),
	quick_links: array(
		object({
			name: string(),
			link: string()
		})
	),
	facebook_link: string(),
	x_link: string()
});

export const Global = intersect([Metadata, Header, Footer]);
export type Global = InferOutput<typeof Global>;

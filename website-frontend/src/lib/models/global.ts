import { array, intersect, nullable, object, partial, string, type InferOutput } from 'valibot';

const Metadata = partial(
	object({
		title: string(),
		description: string(),
		favicon: string()
	})
);

const Header = partial(
	object({
		primary_logo: string(),
		secondary_logo: string(),
		secondary_logo_link: nullable(string())
	})
);

const Footer = partial(
	object({
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
	})
);

export const Global = intersect([Metadata, Header, Footer]);
export type Global = InferOutput<typeof Global>;

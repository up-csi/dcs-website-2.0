export interface NavPage {
	to: string;
	href: string;
	subpages: NavPages;
	options: object;
}

export type NavPages = NavPage[];

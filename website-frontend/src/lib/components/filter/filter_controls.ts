interface FilterCategory {
	categoryName: string;
	checked: boolean;
}

type FilterCategories = FilterCategory[];

export interface FilterControl {
	name: string;
	categories: FilterCategories;
}

export type FilterControls = FilterControl[];

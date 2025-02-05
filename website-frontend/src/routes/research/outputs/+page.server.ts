const dummy = [
	{
		title:
			'Lusog: Development of a Web Application for Detecting Malnutrition in Filipino Children Aged 0–19',
		date_published: '2023-05-31T18:30:50.000Z',
		authors: ['Eriene D. Galinato', 'Julia Mari M. Martinez', 'Ma. Vanessa Clarisse C. Ponteres']
	}
];

export async function load() {
	return {
		publications: dummy
	};
}

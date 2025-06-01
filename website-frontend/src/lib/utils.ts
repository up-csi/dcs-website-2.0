export function deslugify(slug: string): string {
	slug = String(slug);

	const specialCases: Record<string, string> = {
		'part-time-faculty': 'Part-Time Faculty',
		'full-time-faculty': 'Full-Time Faculty'
	};

	if (slug in specialCases) {
		return specialCases[slug];
	}

	const articles = ['of', 'and', 'the', 'in', 'on', 'at', 'to', 'with', 'by', 'for'];
	return slug
		.replace(/_/g, ' ')
		.replace(/-/g, ' ')
		.replace(/\b\w+('\w+)?/g, (word, index) => {
			if (word === 'id') return 'ID';
			if (index === 0 || !articles.includes(word)) {
				// Only capitalize the first character of the word
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			}
			return word;
		});
}

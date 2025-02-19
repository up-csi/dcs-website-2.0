export function deslugify(slug: string): string {
	const articles = ['of', 'and', 'the', 'in', 'on', 'at', 'to', 'with', 'by', 'for'];
	return slug
		.replace(/_/g, ' ')
		.replace(/-/g, ' ')
		.replace(/\b\w+/g, (word, index) => {
			if (word === 'id') return 'ID';
			if (index === 0 || !articles.includes(word)) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			}
			return word;
		});
}

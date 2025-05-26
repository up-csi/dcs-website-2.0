const elementClassMap = {
	strong: 'font-bold',
	em: 'italic',
	img: 'rounded-xl shadow-lg max-w-full h-auto mx-auto',
	a: 'text-blue-600 hover:text-blue-800 underline',
	ul: 'list-disc',
	ol: 'list-decimal',
	blockquote: 'border-l-4 border-gray-300 italic',
	iframe: 'rounded-xl shadow-lg mx-auto',
	hr: 'my-8',
	th: 'p-2 text-center',
	td: 'p-2'
};

// TODO: Add dark mode implementation
export function enhanceWysiwygContent(htmlContent: string): string {
	if (typeof window === 'undefined') {
		return htmlContent;
	}

	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlContent, 'text/html');

	Object.entries(elementClassMap).forEach(([tag, className]) => {
		const elements = doc.getElementsByTagName(tag);
		Array.from(elements).forEach((element) => {
			const existingClasses = element.getAttribute('class');
			element.setAttribute(
				'class',
				existingClasses ? `${existingClasses} ${className}` : className
			);
		});
	});

	return doc.body.innerHTML;
}

const elementClassMap = {
	strong: 'text-red-600 font-bold',
	em: 'text-green-600 italic',
	img: 'rounded-xl shadow-lg max-w-full h-auto mb-6 mx-auto',
	a: 'text-blue-600 hover:text-blue-800 underline',
	ul: 'list-disc list-inside pl-4 mb-4',
	ol: 'list-decimal list-inside pl-4 mb-4',
	li: 'mb-2',
	blockquote: 'border-l-4 border-gray-300 pl-4 italic mb-4',
	iframe: 'rounded-xl shadow-lg  mb-6 mx-auto',
	hr: 'my-4'
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

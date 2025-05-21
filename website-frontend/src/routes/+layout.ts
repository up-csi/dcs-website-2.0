/** @type {import('./$types').LayoutLoad} */
export async function load({ data }) {
	return {
		title: data.global.title,
		description: data.global.description,
		favicon: data.global.favicon,
		primary_logo: data.global.primary_logo,
		secondary_logo: data.global.secondary_logo,
		secondary_logo_link: data.global.secondary_logo_link,
		contact_number: data.global.contact_number,
		contact_email: data.global.contact_email,
		address: data.global.address,
		quick_links: data.global.quick_links,
		facebook_link: data.global.facebook_link,
		x_link: data.global.x_link,
		about_pages: data.about_pages,
		people_categories: data.people_categories,
		academics_categories: data.academics_categories,
		academics_programs: data.academics_programs,
		academics_pages: data.academics_pages,
		laboratories: data.laboratories,
		students_pages: data.students_pages
	};
}

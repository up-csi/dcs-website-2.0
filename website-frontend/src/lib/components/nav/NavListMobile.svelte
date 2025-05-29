<script lang="ts">
	import NavItemMobile from '../list_items/NavItemMobile.svelte';
	import { AboutPage } from '$lib/models/about_pages';
	import { PeopleCategory } from '$lib/models/people_categories';
	import { AcademicsCategory } from '$lib/models/academics_categories';
	import { AcademicsProgram } from '$lib/models/academics_programs';
	import { AcademicsPage } from '$lib/models/academics_pages';
	import { Laboratory } from '$lib/models/laboratories';
	import { StudentsPage } from '$lib/models/students_pages';
	import { deslugify } from '$lib/utils';

	export let about_pages: Pick<AboutPage, 'title' | 'slug'>[];
	export let people_categories: Pick<PeopleCategory, 'title'>[];
	export let academics_categories: Pick<AcademicsCategory, 'name' | 'slug'>[];
	export let academics_programs: Pick<AcademicsProgram, 'title' | 'slug' | 'category'>[];
	export let academics_pages: Pick<AcademicsPage, 'title' | 'slug' | 'category'>[];
	export let laboratories: Pick<Laboratory, 'name' | 'slug'>[];
	export let students_pages: Pick<StudentsPage, 'title' | 'slug'>[];
</script>

<NavItemMobile href="/" to="Home" />
<NavItemMobile href="/about" to="About" dropdown={true}>
	<NavItemMobile href="/about" to="Overview" />
	{#each about_pages as about_page}
		<NavItemMobile href="/about/{about_page.slug}" to={about_page.title} />
	{/each}
</NavItemMobile>
<NavItemMobile href="/events" to="Events" />
<NavItemMobile href="/publications" to="Publications" />
<NavItemMobile href="/people" to="People" dropdown={true}>
	{#each people_categories as people_category}
		<NavItemMobile href="/people/{people_category.title}" to={deslugify(people_category.title)} />
	{/each}
</NavItemMobile>
<NavItemMobile href="/academics" to="Academics" dropdown={true}>
	<NavItemMobile href="/academics" to="Overview" />
	{#each academics_categories as academics_category}
		<NavItemMobile
			href="/academics/{academics_category.slug}"
			to={academics_category.name}
			dropdown={true}
		>
			{#each academics_programs.filter(({ category }) => {
				if (typeof category !== 'string') return category.slug == academics_category.slug;
			}) as academics_program}
				<NavItemMobile
					href="/academics/{academics_category.slug}/programs/{academics_program.slug}"
					to={academics_program.title}
				/>
			{/each}
			<NavItemMobile
				href="/academics/{academics_category.slug}/courses"
				to="{academics_category.name} courses"
			/>
			{#each academics_pages.filter(({ category }) => {
				if (typeof category !== 'string') return category.slug == academics_category.slug;
			}) as academics_page}
				<NavItemMobile
					href="/academics/{academics_category.slug}/{academics_page.slug}"
					to={academics_page.title}
				/>
			{/each}
		</NavItemMobile>
	{/each}
</NavItemMobile>
<NavItemMobile href="/research" to="Research" dropdown={true}>
	<NavItemMobile href="/research" to="Overview" />
	<NavItemMobile href="/research/labs" to="Laboratories" dropdown={true}>
		{#each laboratories as laboratory}
			<NavItemMobile href="/research/labs/{laboratory.slug}" to={laboratory.name} />
		{/each}
	</NavItemMobile>
</NavItemMobile>
<NavItemMobile href="/students" to="Students" dropdown={true}>
	<NavItemMobile href="/students" to="Overview" />
	<NavItemMobile href="/students/organizations" to="Organizations" />
	{#each students_pages as students_page}
		<NavItemMobile href="/students/{students_page.slug}" to={students_page.title} />
	{/each}
</NavItemMobile>
<NavItemMobile href="/alumni" to="Alumni" />
<NavItemMobile href="/partnerships" to="Partnerships" />

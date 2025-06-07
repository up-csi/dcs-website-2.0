<script lang="ts">
	import NavItem from '../list_items/NavItem.svelte';
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

<NavItem href="/" to="Home" />
<NavItem href="/about" to="About" dropdown={true}>
	<NavItem href="/about" to="Overview" />
	{#each about_pages as about_page, i}
		<NavItem href="/about/{about_page.slug}" to={about_page.title ?? `About Page ${i}`} />
	{/each}
</NavItem>
<NavItem href="/events" to="Events" />
<NavItem href="/publications" to="Publications" />
<NavItem href="/people" to="People" dropdown={true}>
	{#each people_categories as people_category, i}
		<NavItem
			href="/people/category/{people_category.title}"
			to={deslugify(people_category.title ?? `people-category-${i}`)}
		/>
	{/each}
</NavItem>
<NavItem href="/academics" to="Academics" dropdown={true}>
	<NavItem href="/academics" to="Overview" />
	{#each academics_categories as academics_category, i}
		<NavItem
			href="/academics/{academics_category.slug}"
			to={academics_category.name ?? `Academics Category ${i}`}
			dropdown={true}
			position="top-0 left-full"
		>
			{#each academics_programs.filter(({ category }) => {
				if (typeof category !== 'string') return category?.slug == academics_category.slug;
			}) as academics_program, i}
				<NavItem
					href="/academics/{academics_category.slug}/programs/{academics_program.slug}"
					to={academics_program.title ?? `Academics Program ${i}`}
				/>
			{/each}
			<NavItem
				href="/academics/{academics_category.slug}/courses"
				to="{academics_category.name} courses"
			/>
			{#each academics_pages.filter(({ category }) => {
				if (typeof category !== 'string') return category?.slug == academics_category.slug;
			}) as academics_page, i}
				<NavItem
					href="/academics/{academics_category.slug}/{academics_page.slug}"
					to={academics_page.title ?? `Academics Page ${i}`}
				/>
			{/each}
		</NavItem>
	{/each}
</NavItem>
<NavItem href="/research" to="Research" dropdown={true}>
	<NavItem href="/research" to="Overview" />
	<NavItem href="/research/labs" to="Laboratories" dropdown={true} position="top-0 left-full">
		{#each laboratories as laboratory, i}
			<NavItem href="/research/labs/{laboratory.slug}" to={laboratory.name ?? `Laboratory ${i}`} />
		{/each}
	</NavItem>
</NavItem>
<NavItem href="/students" to="Students" dropdown={true}>
	<NavItem href="/students" to="Overview" />
	<NavItem href="/students/organizations" to="Organizations" />
	{#each students_pages as students_page, i}
		<NavItem
			href="/students/{students_page.slug}"
			to={students_page.title ?? `Students Page ${i}`}
		/>
	{/each}
</NavItem>
<NavItem href="/alumni" to="Alumni" />
<NavItem href="/partnerships" to="Partnerships" />

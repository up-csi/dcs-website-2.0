<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import CoursesTable from '$lib/components/table/CoursesTable.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import ContentSearchBar from '$lib/components/search/ContentSearchBar.svelte';

	export let data;
	$: ({ academics_category, academics_courses, curriculum_last_updated } = data);
</script>

{#if academics_category}
	<FullWidthBreakout>
		<Banner
			title="{academics_category.name} Courses"
			background_image={academics_category.background_image ?? ''}
		/>
	</FullWidthBreakout>

	<div class="pb-16 md:pb-24">
		<div class="pb-8 pt-2 md:py-8">
			<Breadcrumb />
		</div>

		<p class="mb-3 ml-[2px] mt-2 text-xs font-medium opacity-55">
			Last Updated: {curriculum_last_updated.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>
		<div class="flex flex-col gap-y-5">
			<ContentSearchBar placeholder="Search a course" />
			<CoursesTable {academics_courses} />
		</div>
	</div>
{:else}
	<p>Page not found</p>
{/if}

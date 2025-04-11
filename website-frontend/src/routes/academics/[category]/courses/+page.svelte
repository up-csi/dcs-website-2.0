<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import CoursesTable from '$lib/components/table/CoursesTable.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';

	export let data;
	$: ({ academics_category, academics_courses } = data);
</script>

{#if academics_category}
	<FullWidthBreakout>
		<Banner title="{academics_category.name} Courses" />
	</FullWidthBreakout>

	<div class="pb-16 md:pb-24">
		<div class="pb-8 pt-2 md:py-8">
			<Breadcrumb />
		</div>

		<p class="mb-3 ml-[2px] mt-2 text-xs font-medium opacity-55">Last Updated: March XX, 2025</p>
		<CoursesTable {academics_courses} />
	</div>
{:else}
	<p>Page not found</p>
{/if}

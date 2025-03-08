<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import CoursesTable from '$lib/components/table/CoursesTable.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';

	export let data;
	$: ({ academics_category, academics_courses } = data);
</script>

<body>
	{#if academics_category}
		<Banner title="{academics_category.name} Courses" />

		<div class="flex justify-center px-4">
			<div class="pb-16 md:pb-24 max-w-6xl w-full">
				<div class="space-y-12">

					<div class="pt-5">
						<Breadcrumb />
					</div>

					<div>
						<p class="mb-3 mt-2 ml-[2px] text-xs font-medium opacity-55"> Last Updated: March XX, 2025 </p>
						<CoursesTable data={academics_courses} />
					</div>

				</div>
			</div>
		</div>
	{:else}
		<p>Page not found</p>
	{/if}
</body>

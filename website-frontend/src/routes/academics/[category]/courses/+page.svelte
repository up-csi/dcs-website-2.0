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
			<div class="w-full max-w-6xl pb-16 md:pb-24">
				<div class="space-y-8 md:space-y-12">
					<div class="pt-5">
						<Breadcrumb />
					</div>

					<div>
						<p class="ml-[2px] mt-2 text-xs font-medium opacity-55 mb-3">
							Last Updated: March XX, 2025
						</p>
						<CoursesTable data={academics_courses} />
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p>Page not found</p>
	{/if}
</body>

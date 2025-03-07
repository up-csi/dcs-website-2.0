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

		<div class="container mx-auto my-8 mb-5">
			<Breadcrumb />
		</div>

		<div class="flex justify-center px-4">
			<div class="pb-16 md:pb-24 max-w-6xl w-full">
				<div class="space-y-12">

					<div>
						<div class="flex space-x-2 pb-2 pt-5 text-xs font-medium">
							<a class="" href="/">Home</a>
							<p class="opacity-55">/</p>
							<a class="" href="/academics">Academics</a>
							<p class="opacity-55">/</p>
							<a class="" href="{academics_category.slug}">{academics_category.name}</a>
							<p class="opacity-55">/</p>
							<p class="opacity-55">Courses</p>
						</div>
						<div class="h-[1px] w-full bg-primary opacity-20"></div>
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

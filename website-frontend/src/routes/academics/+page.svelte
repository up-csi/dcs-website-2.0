<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import LinkButton from '$lib/components/buttons/LinkButton.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import DataTable from '$lib/components/table/CoursesTable.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';

	export let data;
	$: ({ academics, academics_courses } = data);
</script>

<body>
	{#if academics}
		<Banner title="Academics" />

		<div class="container mx-auto my-8 mb-5">
			<Breadcrumb />
		</div>

		<div class="container mx-auto my-8 mb-5">
			<Breadcrumb />
		</div>

		<div class="container mx-auto my-8 mb-5">
			<Breadcrumb />
		</div>

		<div class="container mx-auto my-8 mb-5">
			<Breadcrumb />
		</div>

		<div class="flex justify-center px-4">
			<div class="pb-20 md:pb-28 max-w-6xl w-full">

				<div>
					<div class="flex space-x-2 pb-2 pt-5 text-xs font-medium">
						<a class="" href="/">Home</a>
						<p class="opacity-55">/</p>
						<p class="opacity-55">Academics</p>
					</div>
					<div class="h-[1px] w-full bg-primary opacity-20"></div>
				</div>

				<div class="prose pt-10 text-base">
					{#if academics.flexible_content}
						<FlexibleContent content={academics.flexible_content} />
					{:else}
						<p>Page is empty.</p>
					{/if}
				</div>

				<h1 class="mt-10 mb-6 text-3xl font-bold">
					Programs offered by the department
				</h1>
				<div class="space-y-1">
					<LinkButton text="Go To Undergraduate Page" link="academics/undergraduate" />
					<LinkButton text="Go To Graduate Page" link="academics/graduate" />
				</div>

				<h1 class="mt-12 mb-8 text-3xl font-bold">
					Courses offered by the department
				</h1>
				<DataTable data={academics_courses} />

			</div>
		</div>

	{:else}
		<p>Page not found</p>
	{/if}
</body>

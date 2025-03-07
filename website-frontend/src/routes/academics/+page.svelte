<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import HorizontalCard from '$lib/components/cards/HorizontalCard.svelte';
	import DataTable from '$lib/components/table/DataTable.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';

	export let data;
	$: ({ academics, academics_programs, academics_courses } = data);
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

		<div class="px-4 md:px-32">
			<div class="prose py-10 text-base">
				{#if academics.flexible_content}
					<FlexibleContent content={academics.flexible_content} />
				{:else}
					<p>Page is empty.</p>
				{/if}
			</div>

			<h1 class="mb-8 text-3xl font-bold text-center">
				List of programs offered by the department
			</h1>

			<div class="space-y-3">
				{#each academics_programs as program}
					{#if typeof program.category !== 'string'}
						<a href="academics/{program.category.slug}/programs/{program.slug}" class="block">
							<HorizontalCard name={program.title}/>
						</a>
					{/if}
				{/each}
			</div>

			<br />

			<h1 class="mb-8 text-3xl font-bold text-center">
				List of courses offered by the department
			</h1>
			<DataTable data={academics_courses} />
		</div>

	{:else}
		<p>Page not found</p>
	{/if}
</body>

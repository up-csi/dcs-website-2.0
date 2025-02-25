<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banner/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import DataTable from '$lib/components/table/DataTable.svelte';

	export let data;
	$: ({ academics, academics_programs, academics_courses } = data);
</script>

<body>
	{#if academics}
		<Banner title="Academics" />

		<div class="prose px-4 py-10 text-base md:px-32">
			{#if academics.flexible_content}
				<FlexibleContent content={academics.flexible_content} />
			{:else}
				<p>Page is empty.</p>
			{/if}
		</div>

		<h1 class="mb-8 px-4 text-3xl font-bold text-gray-900 md:px-16">
			List of programs offered by the department
		</h1>
		{#each academics_programs as program}
			{#if typeof program.category !== 'string'}
				<ul>
					<a href="academics/{program.category.slug}/programs/{program.slug}">{program.title}</a>
				</ul>
			{/if}
		{/each}
		<br />

		<h1 class="mb-8 px-4 text-3xl font-bold text-gray-900 md:px-16">
			List of courses offered by the department
		</h1>
		<DataTable data={academics_courses} />
	{:else}
		<p>Page not found</p>
	{/if}
</body>

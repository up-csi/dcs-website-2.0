<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import DataTable from '$lib/components/table/DataTable.svelte';

	export let data;
	$: ({ academics_program } = data);
</script>

<body>
	{#if academics_program}
		<Banner title={academics_program.title} />

		<div class="prose px-4 py-10 text-base md:px-32">
			{#if academics_program.flexible_content}
				<FlexibleContent content={academics_program.flexible_content} />
			{:else}
				<p>Page is empty.</p>
			{/if}
		</div>

		<h1 class="mb-8 px-4 text-3xl font-bold text-gray-900 md:px-16">
			Curriculum table for {academics_program.title}
		</h1>
		{#if academics_program.curriculum_table}
			{#each [...new Set(academics_program.curriculum_table
						.filter((item) => typeof item !== 'number')
						.map((item) => item.year)
						.sort((a, b) => a - b))] as year}
				Year {year}
				<br />
				First semester
				<br />
				<DataTable
					data={academics_program.curriculum_table
						.filter((item) => typeof item !== 'number')
						.filter((item) => item.year === year && item.semester === 'first')}
				/>
				<br />
				Second semester
				<br />
				<DataTable
					data={academics_program.curriculum_table
						.filter((item) => typeof item !== 'number')
						.filter((item) => item.year === year && item.semester === 'second')}
				/>
				<br />
				Midyear
				<br />
				<DataTable
					data={academics_program.curriculum_table
						.filter((item) => typeof item !== 'number')
						.filter((item) => item.year === year && item.semester === 'midyear')}
				/>
			{/each}
		{/if}
	{:else}
		<p>Page not found</p>
	{/if}
</body>

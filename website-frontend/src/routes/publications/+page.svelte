<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import LoadMore from '$lib/components/buttons/LoadMore.svelte';
	import PublicationCard from '$lib/components/cards/PublicationCard.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';

	export let data;

	$: ({ publications, laboratories_filters } = data);

	const inc = 12;
	let shown = inc;

	let sortMethod: 'date' | 'author' = 'date';

	$: controls = [
		{
			name: 'laboratory',
			categories: laboratories_filters
		}
	];

	$: sortedPublications = [...publications].sort((a, b) => {
		if (sortMethod === 'author') {
			const aLastName = a.authors[0]?.last_name || '';
			const bLastName = b.authors[0]?.last_name || '';
			return aLastName.localeCompare(bLastName);
		} else {
			return (b.publish_date ?? '1970-01-01').localeCompare(a.publish_date ?? '1970-01-01');
		}
	});

	$: publicationsList = sortedPublications?.slice(0, shown);
</script>

<body>
	<div class="relative z-0">
		<Banner title="Publications" />
	</div>

	<div class="relative z-10 -mt-7">
		<FilterBar {controls} />
	</div>

	<div class="mx-auto my-4 flex justify-center gap-4">
		<button
			class="rounded px-4 py-2 {sortMethod === 'date' ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
			on:click={() => (sortMethod = 'date')}
		>
			Sort by Date
		</button>
		<button
			class="rounded px-4 py-2 {sortMethod === 'author' ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
			on:click={() => (sortMethod = 'author')}
		>
			Sort by Author
		</button>
	</div>

	<div
		class="mx-auto my-3 grid max-w-[94vw] grid-cols-2
        items-end gap-2 pb-20 md:my-8
        md:max-w-[80vw] md:grid-cols-4 md:items-end md:gap-4"
	>
		{#each publicationsList as publication}
			<PublicationCard {publication} />
		{/each}
	</div>
	{#if shown < publications.length}
		<div class="flex items-center justify-center">
			<LoadMore {inc} bind:shown />
		</div>
	{/if}
</body>

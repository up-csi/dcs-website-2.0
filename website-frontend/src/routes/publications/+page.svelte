<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import LoadMore from '$lib/components/buttons/LoadMore.svelte';
	import PublicationCard from '$lib/components/cards/PublicationCard.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import Sort from '$lib/components/sort/Sort.svelte';

	export let data;

	$: ({ publications, years_filters, laboratories_filters, tags_filters } = data);

	const inc = 12;
	let shown = inc;

	let sortMethod: 'date' | 'author' = 'date';

	$: controls = [
		{
			name: 'year',
			categories: years_filters
		},
		{
			name: 'laboratory',
			categories: laboratories_filters
		},
		{
			name: 'tags',
			categories: tags_filters
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

<Banner title="Publications" />

<div class="container mx-auto my-8 gap-y-5">
	<div class="mb-5">
		<Breadcrumb />
	</div>
	<FilterBar {controls} />
	<Sort />

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

	<div class="mx-auto grid max-w-[80vw] grid-cols-1 gap-4 pb-10 md:grid-cols-3 lg:grid-cols-4">
		{#each publicationsList as publication}
			<PublicationCard {publication} />
		{/each}
	</div>
	{#if shown < publications.length}
		<div class="flex items-center justify-center">
			<LoadMore {inc} bind:shown />
		</div>
	{/if}
</div>

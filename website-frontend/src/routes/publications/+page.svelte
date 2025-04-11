<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import LoadMore from '$lib/components/buttons/LoadMore.svelte';
	import PublicationCard from '$lib/components/cards/PublicationCard.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import Sort from '$lib/components/sort/Sort.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import { page } from '$app/stores';

	export let data;

	$: ({ publications, years_filters, laboratories_filters, tags_filters } = data);

	const inc = 12;
	let shown = inc;

	$: sort_options = ['date', 'author'];

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
		if (($page.url.searchParams.get('sort') ?? '') === 'author') {
			const aLastName = a.authors[0]?.last_name || '';
			const bLastName = b.authors[0]?.last_name || '';
			return aLastName.localeCompare(bLastName);
		} else {
			return (b.publish_date ?? '1970-01-01').localeCompare(a.publish_date ?? '1970-01-01');
		}
	});

	$: publicationsList = sortedPublications?.slice(0, shown);
</script>

<FullWidthBreakout>
	<Banner title="Publications" />
</FullWidthBreakout>

<div class="pb-16 text-base md:pb-24">
	<div class="py-2 md:py-8">
		<Breadcrumb />
	</div>

	<FilterBar {controls} />
	<Sort {sort_options} />

	<div class="mx-auto mt-5 grid max-w-[80vw] grid-cols-1 gap-4 pb-10 md:grid-cols-3 lg:grid-cols-4">
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

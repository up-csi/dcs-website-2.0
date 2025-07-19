<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import PublicationCard from '$lib/components/cards/PublicationCard.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import Sort from '$lib/components/sort/Sort.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import Await from '$lib/components/loading/Await.svelte';
	import { page } from '$app/stores';
	import { type Publications } from '$lib/models/publications.js';

	export let data;
	export let publications: Promise<Publications>;

	$: ({
		research,
		years_filters,
		laboratories_filters,
		tags_filters,
		publications_count,
		publications
	} = data);

	$: sort_options = ['date', 'author', 'title'];

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
</script>

<FullWidthBreakout>
	<Banner title="Publications" background_image={research.background_image} />
</FullWidthBreakout>

<div class="pb-16 text-base md:pb-24">
	<div class="py-2 md:py-8">
		<Breadcrumb />
	</div>

	<FilterBar {controls} />
	<Sort {sort_options} />

	<Await
		layout="mx-auto mt-5 grid max-w-[80vw] grid-cols-1 gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
		data={publications.then((res) =>
			res.sort((a, b) => {
				if (($page.url.searchParams.get('sort') ?? '') === 'author') {
					const aLastName = a.authors ? (a.authors[0].last_name ?? '') : '';
					const bLastName = b.authors ? (b.authors[0].last_name ?? '') : '';
					return aLastName.localeCompare(bLastName);
				} else if (($page.url.searchParams.get('sort') ?? '') === 'title') {
					const a_title = a.title || '';
					const b_title = b.title || '';
					return a_title.localeCompare(b_title);
				} else {
					return (b.publish_date ?? '1970-01-01').localeCompare(a.publish_date ?? '1970-01-01');
				}
			})
		)}
		text="publications"
		component={PublicationCard}
		count={publications_count}
	/>
</div>

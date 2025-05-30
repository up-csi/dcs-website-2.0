<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel/index';
	import FeaturedEventCard from '$lib/components/cards/FeaturedEventCard.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import Calendar from '$lib/components/table/Calendar.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';

	export let data;

	$: ({ events, location_filters, discipline_filters } = data);

	$: featured = events?.slice(0, 3);

	$: controls = [
		{
			name: 'location',
			categories: location_filters
		},
		{
			name: 'discipline',
			categories: discipline_filters
		}
	];

	const title = 'Events';
</script>

<FullWidthBreakout>
	<Banner {title} flexible_content={`This is the ${title} page.`} />
</FullWidthBreakout>

<div class="pb-16 text-base md:pb-24">
	<div class="py-2 md:py-8">
		<Breadcrumb />
	</div>

	<FilterBar {controls} />

	<div class="py-2 md:py-8">
		<Calendar {events} />
	</div>
</div>

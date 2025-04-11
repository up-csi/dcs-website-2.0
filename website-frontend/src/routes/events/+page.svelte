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

	const timed = true;

	const title = 'Events';
</script>

<FullWidthBreakout>
	<Banner {title} flexible_content={`This is the ${title} page.`} />
</FullWidthBreakout>

<div class="pb-16 md:pb-24">
	<div class="pb-5 pt-2 md:py-8">
		<Breadcrumb />
	</div>

	<Carousel.Root>
		<Carousel.Content class="-ml-6">
			{#each featured as event}
				<Carousel.Item class="basis-1 pb-16 pl-6 md:basis-1/4">
					<FeaturedEventCard item={event} />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>

	<h1 class="heading-text">Find Events</h1>

	<div class="container mx-auto my-8 h-full flex-col items-center justify-center">
		<div class="flex items-center justify-between md:block">
			<FilterBar {controls} {timed} />
		</div>
		<div class="mx-auto py-8">
			<Calendar {events} />
		</div>
	</div>
</div>

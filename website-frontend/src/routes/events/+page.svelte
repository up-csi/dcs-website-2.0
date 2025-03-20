<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel/index';
	import FeaturedEventCard from '$lib/components/cards/FeaturedEventCard.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import Calendar from '$lib/components/table/Calendar.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';

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

<body class="bg-slate-50">
	<div class="relative z-0">
		<Banner {title} flexible_content={`This is the ${title} page.`} />
	</div>

	<div class="container mx-auto my-8 mb-5">
		<Breadcrumb />
	</div>

	<Carousel.Root>
		<Carousel.Content class="-ml-6 px-16 py-10">
			{#each featured as event}
				<Carousel.Item class="basis-1 pl-6 md:basis-1/4">
					<FeaturedEventCard item={event} />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>

	<h1 class="mb-8 px-4 text-3xl font-bold text-gray-900 md:px-16">Find Events</h1>

	<div class="container mx-auto my-8 h-full flex-col items-center justify-center">
		<div class="flex items-center justify-between md:block">
			<FilterBar {controls} {timed} />
		</div>
		<div class="mx-auto py-8">
			<Calendar {events} />
		</div>
	</div>
</body>

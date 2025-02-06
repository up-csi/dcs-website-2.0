<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banner/Banner.svelte';
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel/index';
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import LoadMore from '$lib/components/load_more/LoadMore.svelte';

	export let data;

	$: ({ events, location_filters, discipline_filters } = data);

	$: featured = events?.slice(0, 3);

	const inc = 10;
	let shown = inc;
	$: eventList = events?.slice(0, shown);

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
		<Banner {title} flexible_content={`This is the ${title} page.`} from_bottom={'bottom-40'} />
	</div>

	<div class="-mt-28 pb-16">
		<Carousel.Root>
			<Carousel.Content class="-ml-6 px-16 py-10">
				{#each featured as event}
					<Carousel.Item class="basis-1 pl-6 md:basis-1/4">
						<FeaturedEventCard {event} />
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	</div>

	<h1 class="mb-8 px-4 text-3xl font-bold text-gray-900 md:px-16">Related Events</h1>

	<div class="container mx-auto my-8 h-full flex-col items-center justify-center">
		<div class="flex items-center justify-between md:block">
			<FilterBar {controls} {timed} />
		</div>
		<div class="my-6 text-gray-800">
			{#each eventList as event}
				<div class="rounded border p-4 md:grid md:grid-cols-6">
					<div class="md:col-span-5">
						<h3>{event.event_headline}</h3>
						<h3 class="block md:hidden">{new Date(event.date_created).toLocaleDateString()}</h3>
						<div class="max-h-6 overflow-hidden *:truncate">
							{@html event.event_content}
						</div>
						<p>View details &#8594;</p>
						<div class="flex items-center">
							<p>Tags:</p>
							{#if event.tags}
								{#each event.tags as tag}
									<p class="mx-2 rounded border px-2 py-1">{tag}</p>
								{/each}
							{/if}
						</div>
					</div>
					<div class="hidden place-content-center md:block">
						<h3>{new Date(event.date_created).toLocaleDateString()}</h3>
					</div>
				</div>
			{/each}
		</div>
		{#if shown < events.length}
			<div class="flex items-center justify-center">
				<LoadMore {inc} bind:shown />
			</div>
		{/if}
	</div>
</body>

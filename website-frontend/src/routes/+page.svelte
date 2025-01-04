<script lang="ts">
	import { Event, Events } from '$lib/models/event';
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: ({ global, events, assets } = data);

	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import Autoplay from 'embla-carousel-autoplay';

	const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });

	let api: CarouselAPI;
	let current = 0;
	let count = 0;

	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;

		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	}
</script>

<div>
	<Carousel.Root
		bind:api
		plugins={[plugin]}
		class="relative h-[80vh] w-full"
		on:mousenter={plugin.stop}
		on:mouseleave={plugin.reset}
	>
		<Carousel.Content>
			{#each Array(6) as _, i (i)}
				<Carousel.Item>
					<img
						src={assets.favicon}
						alt="Carousel Item"
						class="relative h-[80vh] w-full bg-slate-400"
					/>

					<div class="absolute bottom-28 text-white md:px-20">
						<h1 class="mb-5 text-4xl font-bold">Some Big Bold Description Text</h1>
						<p class="text-md font-semibold">Some extra description</p>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>
	<div class="absolute -mt-20 text-sm font-semibold text-white md:px-20">
		Item {current} of {count}
	</div>
</div>

<div class="container mx-auto my-8 h-full flex-col items-center justify-center">
	<div class="space-y-5">
		<h1 class="h1">{global.title}</h1>
		<p>{global.description}</p>
	</div>
	<div class="my-5">
		<div class="flex justify-between">
			<h2>Events</h2>
			<a href="/events">View all &#8594;</a>
		</div>
		<div class="my-12 flex space-x-8 overflow-x-auto">
			{#each featured as event}
				<FeaturedEventCard {event} />
			{/each}
		</div>
	</div>
</div>

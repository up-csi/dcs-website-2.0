<script lang="ts">
	/** @type {import('./$types').PageData} */
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel';
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import LandingHero from '$lib/components/carousels/LandingHero.svelte';
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';
	import NewsCard from '$lib/components/cards/NewsCard.svelte';
	import { ArrowRight } from 'lucide-svelte';

	export let data;

	$: ({ news, events } = data);
</script>

<LandingHero {news} />

<div class="container mx-auto my-8 flex h-full flex-col justify-center gap-y-5">
	<div class="flex justify-between">
		<h2 class="text-xl font-bold md:text-2xl">Recent News</h2>
		<Button href="/news" variant="outline" class="flex gap-x-2 rounded-full">
			<p>View all</p>
			<ArrowRight class="size-4" />
		</Button>
	</div>
	<Carousel.Root>
		<Carousel.Content>
			{#each news as news_item}
				<Carousel.Item class="basis-full md:basis-1/4">
					<NewsCard {news_item} />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Next />
	</Carousel.Root>
	<div class="flex justify-between">
		<h2 class="text-xl font-bold md:text-2xl">Recent Events</h2>
		<Button href="/events" variant="outline" class="flex gap-x-2 rounded-full">
			<p>View all</p>
			<ArrowRight class="size-4" />
		</Button>
	</div>
	<Carousel.Root>
		<Carousel.Content>
			{#each events as event}
				<Carousel.Item class="basis-full md:basis-1/4">
					<FeaturedEventCard {event} />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Next />
	</Carousel.Root>
</div>

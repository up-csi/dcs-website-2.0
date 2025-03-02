<script lang="ts">
	/** @type {import('./$types').PageData} */
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel';
	import LandingHero from '$lib/components/carousels/LandingHero.svelte';
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';
	import NewsCard from '$lib/components/cards/NewsCard.svelte';

	export let data;

	$: ({ title, description, news, events } = data);

	$: featured = events?.slice(0, 3);
</script>

<LandingHero {news} />

<div class="container mx-auto my-8 flex h-full flex-col justify-center gap-y-5">
	<h2 class="text-xl font-bold md:text-2xl">Recent News</h2>
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
	<h2 class="text-xl font-bold md:text-2xl">Recent Events</h2>
	<Carousel.Root>
		<Carousel.Content>
			{#each featured as event}
				<Carousel.Item class="basis-full md:basis-1/4">
					<FeaturedEventCard {event} />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Next />
	</Carousel.Root>
</div>

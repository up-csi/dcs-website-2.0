<script lang="ts">
	/** @type {import('./$types').PageData} */
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel';
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import LandingHero from '$lib/components/carousels/LandingHero.svelte';
	import FeaturedEventCard from '$lib/components/cards/FeaturedEventCard.svelte';
	import NewsCard from '$lib/components/cards/NewsCard.svelte';
	import { ChevronRight } from 'lucide-svelte';

	export let data;

	$: ({ news, events } = data);
</script>

<LandingHero {news} />

<div class="flex justify-center px-4">
	<div class="w-full max-w-7xl pt-10 md:pt-20 pb-16 md:pb-24 space-y-16 md:space-y-24">

		<div>
			<div class="heading-padding flex justify-between items-center">
				<h2 class="heading-text"> Recent News </h2>
				<Button href="#more-news" variant="outline" class="flex gap-x-1 rounded-full text-[0.8rem] h-auto">
					<p>View all</p>
					<ChevronRight class="size-4" />
				</Button>
			</div>
			<Carousel.Root opts={{ align: 'start', dragFree: true }}>
				<Carousel.Content>
					{#each news as news_item}
						<Carousel.Item class="-mr-10 basis-full pr-10 md:-mr-5 md:basis-1/4 md:pr-5">
							<NewsCard {news_item} />
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<Carousel.Next />
			</Carousel.Root>
		</div>

		<div>
			<div class="heading-padding flex justify-between items-center">
				<h2 class="heading-text"> Recent Events </h2>
				<Button href="#more-news" variant="outline" class="flex gap-x-1 rounded-full text-[0.8rem] h-auto">
					<p>View all</p>
					<ChevronRight class="size-4" />
				</Button>
			</div>
			<Carousel.Root opts={{ align: 'start', dragFree: true }}>
				<Carousel.Content>
					{#each events as event}
						<Carousel.Item class="-mr-10 basis-full pr-10 md:-mr-5 md:basis-1/4 md:pr-5">
							<FeaturedEventCard {event} />
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<Carousel.Next />
			</Carousel.Root>
		</div>

	</div>
</div>

<div id="more-news" class="flex justify-center px-4 bg-background-dark text-primary-foreground">
	<div class="w-full max-w-7xl py-16 md:py-24">
		<h2 class="heading-text heading-padding text-center">More News from UPD DCS</h2>
		<div class="flex flex-col gap-5 md:grid md:grid-cols-4">
			{#each news as news_item}
				<NewsCard onDark {news_item} />
			{/each}
		</div>
	</div>
</div>

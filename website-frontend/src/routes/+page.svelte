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
	<div class="w-full md:px-14 pt-10 md:pt-20 pb-16 md:pb-24 space-y-16 md:space-y-24">

		<div class="overflow-visible">
			<div class="heading-padding flex justify-between items-center">
				<h2 class="heading-text"> Recent News </h2>
				<Button href="#more-news" variant="outline" class="flex gap-x-1 rounded-full text-[0.8rem] h-auto">
					<p>View all</p>
					<ChevronRight class="size-4" />
				</Button>
			</div>
			<Carousel.Root opts={{ align: 'start', dragFree: true }}>
				<Carousel.Content class="">
					{#each news as news_item}
						<Carousel.Item class="basis-full md:basis-1/4">
							<NewsCard {news_item} />
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<Carousel.Previous class="absolute left-0"/>
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
			<Carousel.Root opts={{ align: 'start', dragFree: true }} class="w-screen -ml-[50vw] left-1/2 relative">
				<Carousel.Content class="-ml-[90%] -mr-[80%] md:-ml-[18%] md:-mr-[17%]">
					<Carousel.Item class="basis-1/3 md:basis-1/6">
						<div class="h-full"/>
					</Carousel.Item>
					{#each events as event}
						<Carousel.Item class="basis-1/3 md:basis-1/6">
							<FeaturedEventCard {event} />
						</Carousel.Item>
					{/each}
					<Carousel.Item class="basis-1/3 md:basis-1/6">
						<div class="h-full"/>
					</Carousel.Item>
				</Carousel.Content>
				<Carousel.Previous class="absolute left-0 rounded-md h-16 w-20" />
				<Carousel.Next class="absolute right-0 rounded-md"/>
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

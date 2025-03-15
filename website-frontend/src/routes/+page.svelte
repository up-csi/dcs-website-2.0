<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import LandingHero from '$lib/components/carousels/LandingHero.svelte';
	import FeaturedEventCard from '$lib/components/cards/FeaturedEventCard.svelte';
	import CardCarousel from '$lib/components/carousels/CardCarousel.svelte';
	import NewsCard from '$lib/components/cards/NewsCard.svelte';
	import { ChevronRight } from 'lucide-svelte';

	export let data;

	$: ({ news, events } = data);
</script>

<LandingHero {news} />

<div class="flex justify-center px-4">
	<div class="w-full space-y-16 pb-16 pt-10 md:mx-14 md:space-y-24 md:pb-24 md:pt-20">
		<div>
			<div class="heading-padding flex items-center justify-between text-primary-dark">
				<h2 class="heading-text border-l-[5px] border-secondary-red pl-2">Recent News</h2>
				<Button
					href="#more-news"
					variant="outline"
					class="flex h-auto gap-x-1 rounded-full text-[0.8rem]"
				>
					<p>View all</p>
					<ChevronRight class="size-4" />
				</Button>
			</div>
			<CardCarousel CardComponent={NewsCard} items={news} />
		</div>

		<div>
			<div class="heading-padding flex items-center justify-between text-primary-dark">
				<h2 class="heading-text border-l-[5px] border-secondary-red pl-2">Recent Events</h2>
				<Button
					href="#more-news"
					variant="outline"
					class="flex h-auto gap-x-1 rounded-full text-[0.8rem]"
				>
					<p>View all</p>
					<ChevronRight class="size-4" />
				</Button>
			</div>
			<CardCarousel CardComponent={FeaturedEventCard} items={events} />
		</div>
	</div>
</div>

<div id="more-news" class="flex justify-center bg-background-dark px-4 text-primary-foreground">
	<div class="w-full py-16 md:mx-14 md:py-24">
		<h2 class="heading-text heading-padding text-center">More News from UPD DCS</h2>
		<div class="flex flex-col gap-5 md:grid md:grid-cols-4">
			{#each news as item}
				<NewsCard {item} />
			{/each}
		</div>
	</div>
</div>

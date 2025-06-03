<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import LandingHero from '$lib/components/carousels/LandingHero.svelte';
	import FeaturedEventCard from '$lib/components/cards/FeaturedEventCard.svelte';
	import CardCarousel from '$lib/components/carousels/CardCarousel.svelte';
	import NewsCard from '$lib/components/cards/NewsCard.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import { parse } from 'valibot';
	import { News } from '$lib/models/news';
	import { Moon } from 'svelte-loading-spinners';
	import { Frown } from 'lucide-svelte';

	export let data;

	$: ({ news, featured_news, recent_news, recent_events } = data);
</script>

<FullWidthBreakout>
	<LandingHero news={featured_news} />
</FullWidthBreakout>

<div class="flex justify-center">
	<div class="w-full space-y-16 pb-16 pt-10 md:space-y-24 md:pb-24 md:pt-20">
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
			<FullWidthBreakout>
				<CardCarousel CardComponent={NewsCard} items={recent_news} />
			</FullWidthBreakout>
		</div>

		<div>
			<div class="heading-padding flex items-center justify-between text-primary-dark">
				<h2 class="heading-text border-l-[5px] border-secondary-red pl-2">Recent Events</h2>
				<Button
					href="/events"
					variant="outline"
					class="flex h-auto gap-x-1 rounded-full text-[0.8rem]"
				>
					<p>View all</p>
					<ChevronRight class="size-4" />
				</Button>
			</div>
			<FullWidthBreakout>
				<CardCarousel CardComponent={FeaturedEventCard} items={recent_events} />
			</FullWidthBreakout>
		</div>
	</div>
</div>

<FullWidthBreakout>
	<div id="more-news" class="flex justify-center bg-background-dark text-primary-foreground">
		<div class="max-w-[1330px] px-4 py-16 md:px-8 md:py-24 2xl:max-w-screen-2xl">
			<h2 class="heading-text heading-padding text-center">More News from UPD DCS</h2>
			{#await news}
				<div class="flex flex-col items-center justify-center gap-5">
					<Moon size="90" color="hsl(0, 0%, 100%)" unit="px" duration="1s" />
					<p>Loading news...</p>
				</div>
			{:then news}
				<div class="flex flex-col gap-5 md:grid md:grid-cols-4">
					{#each news as item}
						<NewsCard {item} />
					{/each}
				</div>
			{:catch}
				<div class="flex flex-col items-center justify-center gap-5">
					<Frown size="90" />
					<p>Error loading news. Please try refreshing the page.</p>
				</div>
			{/await}
		</div>
	</div>
</FullWidthBreakout>

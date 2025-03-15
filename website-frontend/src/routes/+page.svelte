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
	<div class="w-full md:mx-14 pt-10 md:pt-20 pb-16 md:pb-24 space-y-16 md:space-y-24">

		<div>
			<div class="heading-padding flex justify-between items-center text-primary-dark">
				<h2 class="heading-text border-l-[5px] border-secondary-red pl-2"> Recent News </h2>
				<Button href="#more-news" variant="outline" class="flex gap-x-1 rounded-full text-[0.8rem] h-auto">
					<p>View all</p>
					<ChevronRight class="size-4" />
				</Button>
			</div>
			<CardCarousel CardComponent={NewsCard} items={news} />
		</div>
		
		<div>
			<div class="heading-padding flex justify-between items-center text-primary-dark">
				<h2 class="heading-text border-l-[5px] border-secondary-red pl-2"> Recent Events </h2>
				<Button href="#more-news" variant="outline" class="flex gap-x-1 rounded-full text-[0.8rem] h-auto">
					<p>View all</p>
					<ChevronRight class="size-4" />
				</Button>
			</div>
			<CardCarousel CardComponent={FeaturedEventCard} items={events} />
		</div>

	</div>
</div>

<div id="more-news" class="flex justify-center bg-background-dark text-primary-foreground px-4">
	<div class="w-full md:mx-14 py-16 md:py-24">
		<h2 class="heading-text heading-padding text-center">More News from UPD DCS</h2>
		<div class="flex flex-col gap-5 md:grid md:grid-cols-4">
			{#each news as item}
				<NewsCard onDark {item} />
			{/each}
		</div>
	</div>
</div>

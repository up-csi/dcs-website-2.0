<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import LandingHero from '$lib/components/carousels/LandingHero.svelte';
	import FeaturedEventCard from '$lib/components/cards/FeaturedEventCard.svelte';
	import CardCarousel from '$lib/components/carousels/CardCarousel.svelte';
	import NewsCard from '$lib/components/cards/NewsCard.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import Await from '$lib/components/loading/Await.svelte';

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
			<Await
				onDark
				layout="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
				data={news}
				text="news"
				component={NewsCard}
			/>
		</div>
	</div>
</FullWidthBreakout>

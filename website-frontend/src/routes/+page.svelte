<script lang="ts">
	/** @type {import('./$types').PageData} */
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
	<div class="flex gap-x-8 overflow-x-auto">
		{#each news as news_item}
			<NewsCard {news_item} />
		{/each}
	</div>
	<h2 class="text-xl font-bold md:text-2xl">Recent Events</h2>
	<div class="flex space-x-8 overflow-x-auto">
		{#each featured as event}
			<FeaturedEventCard {event} />
		{/each}
	</div>
</div>

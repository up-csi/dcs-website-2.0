<script lang="ts">
	/** @type {import('./$types').PageData} */
	import LandingHero from '$lib/components/carousels/LandingHero.svelte';
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';

	export let data;

	$: ({ title, description, news, events } = data);

	$: featured = events?.slice(0, 3);
</script>

<LandingHero {news} />

<div class="container mx-auto my-8 flex h-full flex-col justify-center gap-y-5">
	<h2 class="text-xl font-bold md:text-2xl">Recent News</h2>
	<p>{description}</p>
	<div class="my-5">
		<div class="flex justify-between">
			<h2>News</h2>
			<a href="/events">View all &#8594;</a>
		</div>
		<div class="my-12 flex space-x-8 overflow-x-auto">
			{#each news as news_item}
				<!-- TODO: News Card -->
				<div class="w-1/2">
					<a href="/news/{news_item.slug}">
						<p>{news_item.title}</p>
						<br />
						<p class="overflow-hidden text-ellipsis">{news_item.summary}</p>
						<br />
						<p>by {news_item.user_created.first_name} {news_item.user_created.last_name}</p>
					</a>
				</div>
			{/each}
		</div>
	</div>
	<h2 class="text-xl font-bold md:text-2xl">Recent Events</h2>
	<div class="flex space-x-8 overflow-x-auto">
		{#each featured as event}
			<FeaturedEventCard {event} />
		{/each}
	</div>
</div>

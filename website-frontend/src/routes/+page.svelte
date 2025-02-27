<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Hero from '$lib/components/carousels/LandingHero.svelte';
	import FeaturedEventCard from '$lib/components/cards/FeaturedEventCard.svelte';

	export let data;

	$: ({ title, description, news, events } = data);

	$: featured = events?.slice(0, 3);
</script>

<Hero />

<div class="container mx-auto my-8 h-full flex-col items-center justify-center">
	<div class="space-y-5">
		<h1 class="h1">{title}</h1>
		<p>{description}</p>
	</div>
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
	<div class="my-5">
		<div class="flex justify-between">
			<h2>Events</h2>
			<a href="/events">View all &#8594;</a>
		</div>
		<div class="my-12 flex space-x-8 overflow-x-auto">
			{#each featured as event}
				<FeaturedEventCard {event} />
			{/each}
		</div>
	</div>
</div>

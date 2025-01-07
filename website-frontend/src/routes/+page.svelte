<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Hero from '$lib/components/landing/Hero.svelte';
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';

	export let data;

	$: ({ title, description, events } = data);

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

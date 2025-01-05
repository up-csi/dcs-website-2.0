<script lang="ts">
	import { Event, Events } from '$lib/models/event';
	import Hero from '$lib/components/landing/Hero.svelte';
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: ({ title, description, events } = data);

	let sorted_events: Events = events;
	$: sorted_events = events?.toSorted((e0: Event, e1: Event) => {
		let d0 = new Date(e0.date_created),
			d1 = new Date(e1.date_created);
		return d1.getTime() - d0.getTime();
	});

	let featured: Events = [];
	$: featured = sorted_events?.slice(0, 3);
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

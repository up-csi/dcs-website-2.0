<script lang="ts">
	import { Event, Events } from '$lib/models/event';
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: ({ global, events } = data);
	events?.sort((e0: Event, e1: Event) => {
		let d0 = new Date(e0.date_created),
			d1 = new Date(e1.date_created);
		return d1.getTime() - d0.getTime();
	});

	let featured: Events = [];
	$: featured = events?.slice(0, 3);
</script>

<div class="container mx-auto my-8 h-full flex-col items-center justify-center">
	<div class="space-y-5">
		<h1 class="h1">{global.title}</h1>
		<p>{global.description}</p>
	</div>
	<div class="my-5">
		<div class="flex justify-between">
			<h2>Events</h2>
			<a href="/events">View all &#8594;</a>
		</div>
		<div class="flex my-12 space-x-8 overflow-x-auto">
			{#each featured as event}
				<FeaturedEventCard {event} />
			{/each}
		</div>
	</div>
</div>

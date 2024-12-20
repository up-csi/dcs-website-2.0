<script lang="ts">
    import { Events } from "$lib/models/event";
	import FeaturedEventCard from "$lib/components/events/FeaturedEventCard.svelte";

	/** @type {import('./$types').PageData} */
	export let data;

	$: ({ global, events } = data);

	let featured: Events = [];
    $: featured = events?.slice(0, 3);
</script>

<div class="container mx-auto my-8 h-full flex-col items-center justify-center">
	<div class="space-y-5">
		<h1 class="h1">{global.title}</h1>
		<p>{global.description}</p>
	</div>
	<div>
		<div class="flex justify-between">
			<h2>Events</h2>
			<a href="/events">View all &#8594;</a>
		</div>
		<div class="flex my-12 space-x-8">
			{#each featured as event}
				<FeaturedEventCard {event} />
			{/each}
		</div>
	</div>
</div>

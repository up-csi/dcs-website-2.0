<script lang="ts">
	import FeaturedEventCard from "$lib/components/events/FeaturedEventCard.svelte";
	/** @type {import('./$types').PageData} */

	export let data;

	$: ({ global, events } = data);
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
			{#each events as event}
				<FeaturedEventCard {event} />
			{/each}
		</div>
	</div>
</div>

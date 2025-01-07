<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { Event, Events } from '$lib/models/event';
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';

	export let data;

	$: ({ events } = data);

	let sorted_events: Events = events;
	$: sorted_events = events?.toSorted((e0: Event, e1: Event) => {
		let d0 = new Date(e0.date_created),
			d1 = new Date(e1.date_created);
		return d1.getTime() - d0.getTime();
	});

	let featured: Events = [];
	$: featured = sorted_events?.slice(0, 3);
</script>

<div class="container mx-auto my-8 h-full flex-col items-center justify-center">
	<div class="my-12 flex space-x-8 overflow-x-auto">
		{#each featured as event}
			<FeaturedEventCard {event} />
		{/each}
	</div>
	<div>
		{#each sorted_events as event}
			<div class="rounded border p-4 md:grid md:grid-cols-6">
				<div class="md:col-span-5">
					<h3>{event.event_headline}</h3>
					<h3 class="block md:hidden">{new Date(event.date_created).toLocaleDateString()}</h3>
					<div class="max-h-6 overflow-hidden *:truncate">
						{@html event.event_content}
					</div>
					<p>View details &#8594;</p>
					<div class="flex items-center">
						<p>Tags:</p>
						{#if event.tags}
							{#each event.tags as tag}
								<p class="mx-2 rounded border px-2 py-1">{tag}</p>
							{/each}
						{/if}
					</div>
				</div>
				<div class="hidden place-content-center md:block">
					<h3>{new Date(event.date_created).toLocaleDateString()}</h3>
				</div>
			</div>
		{/each}
	</div>
</div>

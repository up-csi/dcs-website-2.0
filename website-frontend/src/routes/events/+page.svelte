<script lang="ts">
	import { Event, Events } from '$lib/models/event';
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: ({ events } = data);
	events?.sort((e0: Event, e1: Event) => {
		let d0 = new Date(e0.date_created),
			d1 = new Date(e1.date_created);
		return d1.getTime() - d0.getTime();
	});

	let featured: Events = [];
	$: featured = events?.slice(0, 3);
</script>

<div class="container h-full mx-auto flex-col justify-center items-center my-8">
	<div class="flex my-12 space-x-8 overflow-x-auto">
		{#each featured as event}
			<FeaturedEventCard {event} />
		{/each}
	</div>
	<div>
		{#each events as event}
			<div class="md:grid md:grid-cols-6 border rounded p-4">
				<div class="md:col-span-5">
					<h3>{event.event_headline}</h3>
					<h3 class="block md:hidden">{new Date(event.date_created).toLocaleDateString()}</h3>
					<div class="max-h-6 *:truncate overflow-hidden">
						{@html event.event_content}
					</div>
					<p>View details &#8594;</p>
					<div class="flex items-center">
						<p>Tags:</p>
						{#each event.tags as tag}
							<p class="border rounded px-2 py-1 mx-2">{tag}</p>
						{/each}
					</div>
				</div>
				<div class="hidden md:block place-content-center">
					<h3>{new Date(event.date_created).toLocaleDateString()}</h3>
				</div>
			</div>
		{/each}
	</div>
</div>

<script lang="ts">
	/** @type {import('./$types').PageData} */
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';

	export let data;

	$: ({ events } = data);

	$: featured = events?.slice(0, 3);
</script>

<div class="container mx-auto my-8 h-full flex-col items-center justify-center">
	<div class="my-12 flex space-x-8 overflow-x-auto">
		{#each featured as event}
			<FeaturedEventCard {event} />
		{/each}
	</div>
	<div>
		{#each events as event}
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

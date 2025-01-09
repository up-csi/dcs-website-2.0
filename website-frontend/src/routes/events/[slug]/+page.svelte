<script lang="ts">
	/** @type {import('./$types').PageData} */
	import DetailsBanner from '$lib/components/events/DetailsBanner.svelte';
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';

	export let data;
	$: ({ our_event } = data);
</script>

<body>
	{#if our_event}
		<div class="relative">
			<DetailsBanner
				title={our_event.event_headline}
				background_image={our_event.background_image ?? ''}
				location={our_event.event_location}
    			start_date={our_event.start_date}
    			end_date={our_event.end_date ?? ''}
    			register_link={our_event.register_link ?? ''}
			/>
		</div>

		<div
			class="mx-auto my-3 grid
            max-w-[94vw] grid-cols-2 gap-2 pb-20
            md:my-8 md:max-w-[80vw] md:grid-cols-4 md:gap-4"
		>
			{#each related_events as related_event}
				<a href="/events/{related_event.event_headline}">
					<FeaturedEventCard {related_event} />
				</a>
			{/each}
		</div>
	{:else}
		<p>Event not found</p>
	{/if}
</body>
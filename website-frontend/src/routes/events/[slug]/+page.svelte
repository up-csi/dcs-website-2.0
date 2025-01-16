<script lang="ts">
	/** @type {import('./$types').PageData} */
	import DetailsBanner from '$lib/components/events/DetailsBanner.svelte';

	export let data;
	$: ({ event } = data);
</script>

<body class="bg-white">
	{#if event}
		<div class="relative">
			<DetailsBanner
				title={event.event_headline}
				background_image={event.hero_image ?? ''}
				location={event.location ?? ''}
				start_date={event.start_date}
				end_date={event.end_date ?? ''}
			/>
		</div>

		<div class="px-4 py-14 text-gray-800 md:px-64 md:py-16">
			{event.event_content}
		</div>

		<h1 class="mb-8 px-4 text-2xl font-bold text-gray-900 md:px-32">Related Events</h1>

		<!-- <div
			class="mx-auto my-3 grid
            max-w-[94vw] grid-cols-2 gap-2 pb-20
            md:my-8 md:max-w-[80vw] md:grid-cols-4 md:gap-4"
		>
			{#each related_events as related_event}
				<a href="/events/{related_event.event_headline}">
					<FeaturedEventCard {related_event} />
				</a>
			{/each}
		</div> -->
	{:else}
		<p>Event not found</p>
	{/if}
</body>

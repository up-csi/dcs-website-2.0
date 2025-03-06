<script lang="ts">
	/** @type {import('./$types').PageData} */
	import DetailsBanner from '$lib/components/banners/EventBanner.svelte';
	import FeaturedEventCard from '$lib/components/cards/FeaturedEventCard.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';

	export let data;
	$: ({ event, related_events } = data);
</script>

{#if event}
	<div class="relative">
		<DetailsBanner
			title={event.event_headline}
			background_image={event.hero_image ?? ''}
			display_location={event.display_location ?? ''}
			start_date={event.start_date}
			end_date={event.end_date ?? null}
		/>
	</div>

	<div class="px-4 py-14 md:px-64 md:py-16">
		<div class="mb-5">
			<Breadcrumb page_name={event.event_headline} />
		</div>
		<FlexibleContent content={event.event_content} />
	</div>

	{#if related_events}
		<h1 class="mb-8 px-4 text-2xl font-bold md:px-32">Related Events</h1>

		<div
			class="mx-auto my-3 grid
			max-w-[94vw] grid-cols-2 gap-2 pb-20
			md:my-8 md:max-w-[80vw] md:grid-cols-4 md:gap-4"
		>
			{#each related_events as related_event}
				{#if typeof related_event !== 'string'}
					<FeaturedEventCard event={related_event} />
				{/if}
			{/each}
		</div>
	{/if}
{:else}
	<p>Event not found</p>
{/if}

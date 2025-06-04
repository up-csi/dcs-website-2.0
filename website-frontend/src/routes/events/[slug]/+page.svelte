<script lang="ts">
	/** @type {import('./$types').PageData} */
	import DetailsBanner from '$lib/components/banners/EventBanner.svelte';
	import FeaturedEventCard from '$lib/components/cards/FeaturedEventCard.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import CardCarousel from '$lib/components/carousels/CardCarousel.svelte';

	export let data;
	$: ({ event, related_events } = data);

	$: tags = event.event_tags
		? event.event_tags
				.filter((tag) => typeof tag === 'object')
				.map(({ events_tags_id }) => {
					if (typeof events_tags_id === 'object') return events_tags_id.name;
				})
				.filter((tag) => typeof tag !== 'undefined')
		: [];
</script>

{#if event}
	<div class="relative">
		<FullWidthBreakout>
			<DetailsBanner
				title={event.event_headline ?? ''}
				tags={tags ?? []}
				background_image={event.hero_image ?? ''}
				display_location={event.display_location ?? ''}
				start_date={event.start_date ?? 'datetime'}
				end_date={event.end_date ?? null}
			/>
		</FullWidthBreakout>
	</div>

	<div class="pb-16 md:pb-24">
		<div class="pb-5 pt-2 md:py-8">
			<Breadcrumb page_name={event.event_headline} />
		</div>
		<FlexibleContent content={event.event_content ?? 'Event content is empty.'} />
	</div>

	{#if related_events}
		<h1 class="heading-text heading-padding">Related Events</h1>
		<FullWidthBreakout>
			<CardCarousel CardComponent={FeaturedEventCard} items={related_events} />
		</FullWidthBreakout>
	{/if}
{:else}
	<p>Event not found</p>
{/if}

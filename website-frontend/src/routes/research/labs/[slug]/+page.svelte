<script lang="ts">
	/** @type {import('./$types').PageData} */
	import FeaturedEventCard from '$lib/components/cards/FeaturedEventCard.svelte';
	import Hero from '$lib/components/carousels/LabHero.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';
	import ReadMore from '$lib/components/buttons/ReadMore.svelte';
	import PublicationCard from '$lib/components/cards/PublicationCard.svelte';
	import PeopleCard from '$lib/components/cards/PeopleCard.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import { Laboratory } from '$lib/models/laboratories';
	import { Publications } from '$lib/models/publications';
	import CardCarousel from '$lib/components/carousels/CardCarousel.svelte';

	export let data;
	let laboratory: Laboratory;
	let publications: Publications;
	let background_images;
	let affiliates;
	let events;
	$: ({ laboratory, publications } = data);

	$: background_images = laboratory.background_images
		? laboratory.background_images
				.filter((img) => typeof img !== 'number')
				.map((img) => {
					if (typeof img.directus_files_id !== 'string') {
						return img.directus_files_id?.id ?? '';
					}
					return '';
				})
		: [];

	$: affiliates = laboratory.affiliates
		? laboratory.affiliates
				.filter((affiliate) => typeof affiliate !== 'string')
				.map((affiliate) => {
					const person = affiliate.people_id;
					if (typeof person === 'object')
						return {
							id: person.id,
							first_name: person.first_name,
							last_name: person.last_name,
							username: person.username,
							category: person.category,
							profile_image: person.profile_image ?? '',
							background_image: person.background_image ?? '',
							position: affiliate.role,
							affiliations: person.affiliations,
							publications: person.publications ?? []
						};
					return null;
				})
		: [];

	$: events = laboratory.events
		? laboratory.events
				.filter((event) => typeof event !== 'string')
				.map((event) => {
					const e = event.events_id;
					if (typeof e === 'object') {
						return {
							id: e.id,
							slug: e.slug,
							date_created: e.date_created,
							event_headline: e.event_headline,
							hero_image: e.hero_image ?? '',
							event_content: e.event_content,
							start_date: e.start_date as 'datetime',
							end_date: e.end_date as 'datetime',
							event_area: e.event_area,
							display_location: e.display_location,
							event_tags: e.event_tags
						};
					}
					return null;
				})
		: [];

	let showFull = false;
</script>

{#if laboratory}
	<FullWidthBreakout>
		<div class="relative z-0">
			<Hero
				title={laboratory.name ?? ''}
				{background_images}
				logo_image={laboratory.logo ?? ''}
				link=""
			/>
		</div>

		<div class="bg-background-dark">
			<div
				class="space-y-9 px-4 pb-16 pt-9 md:max-w-6xl md:space-y-12 md:px-10 md:pb-20 md:pt-12 lg:pl-[302px]"
			>
				{#if laboratory.brief_description}
					<div class="text-2xl font-semibold leading-tight text-primary-foreground md:leading-snug">
						<p>{laboratory.brief_description}</p>
					</div>
				{/if}

				{#if laboratory.location || laboratory.contact_email}
					<InfoCard
						location={laboratory.location ?? ''}
						contact_email={laboratory.contact_email ?? ''}
					/>
				{/if}

				{#if laboratory.description}
					{#if showFull}
						<div class="text-lg leading-normal text-primary-foreground">
							<p class="duration-400 overflow-hidden transition-all">
								{laboratory.description}
							</p>
						</div>
					{:else}
						<div class="mt-9">
							<ReadMore bind:showFull />
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</FullWidthBreakout>

	<div class="mx-auto px-4 pb-8 md:mt-12 md:px-10 md:pb-10">
		<h2 class="my-6 text-3xl font-bold">Members</h2>
		{#if affiliates.length === 0}
			<p class="col-span-2 py-8 text-center italic text-gray-500 md:col-span-4">No members found</p>
		{:else}
			<CardPanel>
				{#each affiliates as affiliate}
					{#if affiliate}
						<a
							href="/people/{affiliate.username}"
							class="-m-5 grow-0 basis-full p-5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
						>
							<PeopleCard item={affiliate} laboratory={laboratory.name ?? 'N/A'} />
						</a>
					{/if}
				{/each}
			</CardPanel>
		{/if}
	</div>

	<div class="mx-auto px-4 pb-4 md:mt-12 md:px-10 md:pb-10">
		<h2 class="my-6 text-3xl font-bold">Publications</h2>
		{#if publications.length === 0}
			<p class="col-span-1 py-8 text-center italic text-gray-500 md:col-span-4">
				No publications found
			</p>
		{:else}
			<FullWidthBreakout>
				<CardCarousel CardComponent={PublicationCard} items={publications} />
			</FullWidthBreakout>
		{/if}
	</div>

	<div class="mx-auto px-4 pb-8 md:px-10 md:pb-20">
		<h2 class="my-6 text-3xl font-bold">Events</h2>
		{#if events.length === 0}
			<p class="col-span-2 py-8 text-center italic text-gray-500 md:col-span-4">No events found</p>
		{:else}
			<FullWidthBreakout>
				<CardCarousel CardComponent={FeaturedEventCard} items={events} />
			</FullWidthBreakout>
		{/if}
	</div>
{:else}
	<p>Laboratory not found</p>
{/if}

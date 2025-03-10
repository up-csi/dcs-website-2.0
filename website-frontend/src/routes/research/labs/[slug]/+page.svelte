<script lang="ts">
	/** @type {import('./$types').PageData} */
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel';
	import FeaturedEventCard from '$lib/components/cards/FeaturedEventCard.svelte';
	import Hero from '$lib/components/carousels/LabHero.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';
	import ReadMore from '$lib/components/buttons/ReadMore.svelte';
	import PublicationCard from '$lib/components/cards/PublicationCard.svelte';
	import PeopleCard from '$lib/components/cards/PeopleCard.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import { Laboratory } from '$lib/models/laboratories';
	import { Publications } from '$lib/models/publications';

	export let data;
	let laboratory: Laboratory;
	let publications: Publications;
	$: ({ laboratory, publications } = data);

	const background_images = laboratory.background_images
		? laboratory.background_images
				.filter((img) => typeof img !== 'string')
				.map((img) => {
					if (typeof img.directus_files_id !== 'string') {
						return img.directus_files_id.id;
					}
					return '';
				})
		: [];

	const affiliates = laboratory.affiliates
		? laboratory.affiliates
				.filter((affiliate) => typeof affiliate !== 'string')
				.map((affiliate) => {
					const person = affiliate.people_id;
					if (typeof person !== 'string')
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

	const events = laboratory.events
		? laboratory.events
				.filter((event) => typeof event !== 'string')
				.map((event) => {
					const e = event.events_id;
					if (typeof e !== 'string') {
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
							tags: e.tags,
							event_tags: e.event_tags
						};
					}
					return null;
				})
		: [];

	console.log(events);
	let showFull = false;
</script>

<body>
	{#if laboratory}
		<div class="relative z-0">
			<Hero
				title={laboratory.name}
				{background_images}
				logo_image={laboratory.logo ?? ''}
				link=""
			/>
		</div>

		<div class="bg-primary">
			<div
				class="space-y-9 px-4 pb-16 pt-9 md:max-w-6xl md:space-y-12 md:px-10 md:pb-20 md:pt-12 lg:pl-[302px]"
			>
				{#if laboratory.brief_description}
					<div class="text-2xl font-semibold leading-tight text-primary-foreground md:leading-snug">
						<p>{laboratory.brief_description}</p>
					</div>
				{/if}

				<InfoCard
					location={laboratory.location ?? ''}
					contact_email={laboratory.contact_email ?? ''}
				/>

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
			</div>
		</div>

		<div class="mx-auto px-4 pb-4 md:mt-12 md:px-10 md:pb-10">
			<h2 class="my-6 text-3xl font-bold">Publications</h2>
			<div class="grid grid-cols-1 items-end gap-2 md:my-8 md:grid-cols-4 md:items-end md:gap-4">
				{#if publications.length === 0}
					<p class="col-span-1 py-8 text-center italic text-gray-500 md:col-span-4">
						No publications found
					</p>
				{:else}
					{#each publications as publication}
						<PublicationCard {publication} />
					{/each}
				{/if}
			</div>
		</div>

		<div class="mx-auto px-4 pb-4 md:px-10 md:pb-10">
			<h2 class="my-6 text-3xl font-bold">Members</h2>
			{#if affiliates.length === 0}
				<p class="col-span-2 py-8 text-center italic text-gray-500 md:col-span-4">
					No members found
				</p>
			{:else}
				<CardPanel>
					{#each affiliates as affiliate}
						{#if affiliate}
							<PeopleCard person={affiliate} laboratory={laboratory.name} />
						{/if}
					{/each}
				</CardPanel>
			{/if}
		</div>

		<div class="mx-auto px-4 pb-8 md:px-10 md:pb-20">
			<h2 class="my-6 text-3xl font-bold">Events</h2>
			{#if events.length === 0}
				<p class="col-span-2 py-8 text-center italic text-gray-500 md:col-span-4">
					No events found
				</p>
			{:else}
				<Carousel.Root>
					<Carousel.Content>
						{#each events as event}
							{#if event}
								<Carousel.Item class="basis-full md:basis-1/4">
									<FeaturedEventCard {event} />
								</Carousel.Item>
							{/if}
						{/each}
					</Carousel.Content>
					<Carousel.Next />
				</Carousel.Root>
			{/if}
		</div>
	{:else}
		<p>Laboratory not found</p>
	{/if}
</body>

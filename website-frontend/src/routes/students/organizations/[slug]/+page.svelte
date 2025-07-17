<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import Hero from '$lib/components/carousels/LabHero.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';
	import ReadMore from '$lib/components/buttons/ReadMore.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import { ArrowRight } from 'lucide-svelte';
	import NewsCard from '$lib/components/cards/NewsCard.svelte';
	import FeaturedEventCard from '$lib/components/cards/FeaturedEventCard.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import type { StudentsOrganization } from '$lib/models/students_organizations';
	import type { Events } from '$lib/models/event';
	import type { News } from '$lib/models/news';
	import CardCarousel from '$lib/components/carousels/CardCarousel.svelte';

	export let data;
	let organization: StudentsOrganization;
	let events: Events;
	let news: News;
	$: ({ organization, events, news } = data);

	let showFull = false;

	$: background_images = organization.background_images
		? organization.background_images
				.filter((img) => typeof img !== 'number')
				.map((img) => {
					if (typeof img.directus_files_id !== 'string') {
						return img.directus_files_id?.id ?? '';
					}
					return '';
				})
		: [];
</script>

{#if organization}
	<FullWidthBreakout>
		<div class="relative z-0">
			<Hero
				title={organization.name ?? ''}
				{background_images}
				logo_image={organization.logo ?? ''}
				link={organization.website ?? ''}
			/>
		</div>

		<div class="bg-background-dark">
			<div
				class="space-y-9 px-4 pb-16 pt-9 md:max-w-6xl md:space-y-12 md:px-10 md:pb-20 md:pt-12 lg:pl-[302px]"
			>
				{#if organization.mission}
					<div class="text-2xl font-semibold leading-tight text-primary-foreground md:leading-snug">
						<p>{organization.mission}</p>
					</div>
				{/if}

				{#if organization.location || organization.email || organization.founding_date}
					<InfoCard
						location={organization.location ?? ''}
						contact_email={organization.email ?? ''}
						founding_date={organization.founding_date ?? ''}
					/>
				{/if}

				{#if organization.description}
					{#if showFull}
						<div class="text-lg leading-normal text-primary-foreground">
							<div class="text-lg leading-normal text-primary-foreground">
								<p class="duration-400 overflow-hidden transition-all">
									{organization.description}
								</p>
							</div>
						</div>

						<FlexibleContent inverted content={organization.flexible_content} />
					{:else}
						<div class="mt-9">
							<ReadMore bind:showFull />
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</FullWidthBreakout>

	<div class="mx-auto flex flex-col justify-center space-y-16 py-16 md:space-y-24 md:py-24">
		<!-- Events -->
		<div>
			<div class="heading-padding flex items-center justify-between text-primary-dark">
				<h2 class="heading-text">Events by {organization.name}</h2>
				<Button href="/events" variant="outline" class="flex gap-x-2 rounded-full">
					<p>View all</p>
					<ArrowRight class="size-4" />
				</Button>
			</div>
			<FullWidthBreakout>
				<CardCarousel CardComponent={FeaturedEventCard} items={events} />
			</FullWidthBreakout>
		</div>

		<!-- News -->
		<div>
			<div class="heading-padding flex items-center justify-between text-primary-dark">
				<h2 class="heading-text">News from {organization.name}</h2>
				<Button href="/news" variant="outline" class="flex gap-x-2 rounded-full">
					<p>View all</p>
					<ArrowRight class="size-4" />
				</Button>
			</div>
			<FullWidthBreakout>
				<CardCarousel CardComponent={NewsCard} items={news} />
			</FullWidthBreakout>
		</div>
	</div>
{:else}
	<p>Student organization not found</p>
{/if}

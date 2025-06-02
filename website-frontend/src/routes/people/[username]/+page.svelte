<script>
	/** @type {import('./$types').PageData} */
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel';
	import * as Tabs from '$lib/@shadcn-svelte/ui/tabs';
	import Banner from '$lib/components/banners/PeopleBanner.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';
	import PublicationCard from '$lib/components/cards/PublicationCard.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';

	export let data;
	const { person } = data;

	const affiliations = person.affiliations
		? person.affiliations
				.filter((affiliation) => typeof affiliation !== 'string')
				.map((affiliation) => {
					if (typeof affiliation.laboratories_id !== 'string') {
						return {
							role: affiliation.role,
							laboratory: affiliation.laboratories_id?.name
						};
					}
					return {};
				})
		: [];

	const publications = person.publications
		? person.publications
				.filter((publication) => typeof publication !== 'number')
				.map((publication) => {
					const pub = publication.publications_id;
					return typeof pub !== 'string' ? pub : null;
				})
				.filter((item) => item !== null)
		: [];

	const affiliationList = affiliations.map((a) => ({
		role: a.role ?? '',
		affiliation: a.laboratory ?? ''
	}));

	$: showEducation = !!person.educational_attainment?.length;
	$: showAffiliations = !!person.affiliations?.length;
	$: showAwards = !!person.awards?.length;
</script>

<div>
	<FullWidthBreakout>
		<div class="relative z-0">
			<Banner
				background_image={person.background_image ?? ''}
				profile_image={person.profile_image ?? ''}
				first_name={person.first_name}
				last_name={person.last_name}
				position={person.position}
				email={person.email ?? ''}
				website={person.website ?? ''}
				laboratory={affiliations[0]?.laboratory ?? ''}
			/>
		</div>

		<div class="-mt-[1px] bg-background-dark">
			<div
				class="space-y-9 px-4 pb-16 pt-9 md:max-w-6xl md:space-y-12 md:px-10 md:pb-24 md:pt-12 lg:pl-[369px]"
			>
				<Tabs.Root value="basic info" class="w-full">
					<Tabs.List class="flex">
						<Tabs.Trigger value="basic info" class="w-full">Basic Info</Tabs.Trigger>
						{#if showEducation}
							<Tabs.Trigger value="education" class="w-full">Education</Tabs.Trigger>
						{/if}
						{#if showAffiliations}
							<Tabs.Trigger value="affiliations" class="w-full">Affiliations</Tabs.Trigger>
						{/if}
						{#if showAwards}
							<Tabs.Trigger value="awards" class="w-full">Awards</Tabs.Trigger>
						{/if}
					</Tabs.List>

					<Tabs.Content value="basic info">
						<InfoCard
							office={person.location ?? ''}
							telephone={person.telephone ?? ''}
							contact_email={person.email ?? ''}
							interests={person.interests ?? ''}
						/>
					</Tabs.Content>

					{#if showEducation}
						<Tabs.Content value="education">
							<InfoCard educational_attainment={person.educational_attainment ?? []} />
						</Tabs.Content>
					{/if}

					{#if showAffiliations}
						<Tabs.Content value="affiliations">
							<InfoCard affiliations={affiliationList} />
						</Tabs.Content>
					{/if}

					{#if showAwards}
						<Tabs.Content value="awards">
							<InfoCard awards={person.awards ?? ''} />
						</Tabs.Content>
					{/if}
				</Tabs.Root>
			</div>
		</div>
	</FullWidthBreakout>

	{#if publications.length !== 0}
		<div class="mx-auto py-10 pb-12 md:py-20">
			<h2 class="heading-padding heading-text border-l-[5px] border-secondary-red pl-2">
				Publications by {person.first_name}
				{person.last_name}
			</h2>
			<Carousel.Root opts={{ align: 'start', dragFree: true }}>
				<Carousel.Content>
					{#each publications as publication}
						{#if publication}
							<Carousel.Item class="-mr-10 h-full basis-full pr-10 md:-mr-5 md:basis-1/4 md:pr-5">
								<PublicationCard {publication} />
							</Carousel.Item>
						{/if}
					{/each}
				</Carousel.Content>
				<Carousel.Next />
			</Carousel.Root>
		</div>
	{/if}
</div>

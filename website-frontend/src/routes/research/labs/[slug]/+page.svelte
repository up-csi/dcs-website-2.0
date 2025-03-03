<script>
	/** @type {import('./$types').PageData} */
	import Hero from '$lib/components/carousels/LabHero.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';
	import ReadMore from '$lib/components/buttons/ReadMore.svelte';
	import PublicationCard from '$lib/components/card/PublicationCard.svelte';
	import PeopleCard from '$lib/components/people/PeopleCard.svelte';

	export let data;
	const { laboratory, publications } = data;

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

	console.log(laboratory.affiliates);

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
							affiliations: person.affiliations
						};
					return null;
				})
				.filter(Boolean)
		: [];

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

		<div class="mx-auto max-w-[94vw] md:max-w-[80vw]">
			<h2 class="my-6 text-3xl font-bold">Publications</h2>
			<div class="grid grid-cols-2 items-end gap-2 md:my-8 md:grid-cols-4 md:items-end md:gap-4">
				{#each publications as publication}
					<PublicationCard {publication} />
				{/each}
			</div>
		</div>

		<div class="mx-auto max-w-[94vw] md:max-w-[80vw]">
			<h2 class="my-6 text-3xl font-bold">Members</h2>
			<div class="grid grid-cols-2 items-end gap-2 md:my-8 md:grid-cols-4 md:items-end md:gap-4">
				{#each affiliates as affiliate}
					{#if affiliate}
						<a href="/people/{affiliate.category}/{affiliate.username}">
							<PeopleCard person={affiliate} laboratory={laboratory.name} />
						</a>
					{/if}
				{/each}
			</div>
		</div>
	{:else}
		<p>Laboratory not found</p>
	{/if}
</body>

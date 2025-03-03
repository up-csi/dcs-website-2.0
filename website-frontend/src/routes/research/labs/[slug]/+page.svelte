<script>
	/** @type {import('./$types').PageData} */
	import Hero from '$lib/components/carousels/LabHero.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';
	import ReadMore from '$lib/components/buttons/ReadMore.svelte';
	import PublicationCard from '$lib/components/card/PublicationCard.svelte';

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
	{:else}
		<p>Laboratory not found</p>
	{/if}
</body>

<script>
	/** @type {import('./$types').PageData} */
	import Hero from '$lib/components/carousels/LabHero.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';
	import ReadMore from '$lib/components/buttons/ReadMore.svelte';

	export let data;
	const { laboratory } = data;

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
	{:else}
		<p>Laboratory not found</p>
	{/if}
</body>

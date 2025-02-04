<script>
	/** @type {import('./$types').PageData} */
	import Hero from '$lib/components/carousels/LabHero.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';
	import ReadMore from '$lib/components/buttons/ReadMore.svelte';

	export let data;
	const { laboratory } = data;

	let showFull = false;
</script>

<body>
	{#if laboratory}
		<div class="relative z-0">
			<Hero 
				title={laboratory.name} 
				background_images={[]}
				logo_image={laboratory.logo ?? ''}
				link=""
			/>
		</div>

		<div class="bg-primary">
			<div class="px-4 space-y-9 pt-9 pb-16 md:max-w-6xl md:space-y-12 md:pt-12 md:pb-20 md:px-10 lg:pl-[302px]">
				<div class="text-2xl font-semibold text-primary-foreground leading-tight md:leading-snug">
					<p>insert laboratory.tagline here</p>
				</div>
		
				<InfoCard 
					location={laboratory.location ?? ''}
					contact_email={laboratory.contact_email ?? ''}
				/>
		
				<div class="text-lg leading-normal text-primary-foreground">
					<p
						class="overflow-hidden transition-all duration-400"
						class:line-clamp-6={!showFull}
					>{@html laboratory.description}</p>

					{#if !showFull}
						<div class="mt-9">
							<ReadMore bind:showFull />
						</div>
					{/if}
				</div>
			</div>
		</div>

	{:else}
		<p>Laboratory not found</p>
	{/if}
</body>
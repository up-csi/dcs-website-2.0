<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { onMount, tick } from 'svelte';
	import Hero from '$lib/components/carousels/LabHero.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';
	import ReadMore from '$lib/components/buttons/ReadMore.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';

	export let data;
	const { organization } = data;

	let showFull = false;

	const background_images = organization.background_images
		? organization.background_images.map((img) => img.directus_files_id.id)
		: [];
</script>

{#if organization}
	<div class="relative z-0">
		<Hero
			title={organization.name}
			{background_images}
			logo_image={organization.logo ?? ''}
			link={organization.website ?? ''}
		/>
	</div>

	<div class="bg-primary">
		<div
			class="space-y-9 px-4 pb-16 pt-9 md:max-w-6xl md:space-y-12 md:px-10 md:pb-20 md:pt-12 lg:pl-[302px]"
		>
			<div class="text-2xl font-semibold leading-tight text-primary-foreground md:leading-snug">
				<p>{organization.mission}</p>
			</div>

			<InfoCard
				location="insert organization.location here"
				contact_email={organization.email ?? ''}
				founding_date={organization.founding_date ?? ''}
			/>

			<FlexibleContent content={organization.flexible_content} isDark={true} />

			<div class="text-lg leading-normal text-primary-foreground">
				<div class="text-lg leading-normal text-primary-foreground">
					<p class="duration-400 overflow-hidden transition-all" class:line-clamp-6={!showFull}>
						{organization.description}
					</p>

					{#if !showFull}
						<div class="mt-9">
							<ReadMore bind:showFull />
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{:else}
	<p>Research lab not found</p>
{/if}

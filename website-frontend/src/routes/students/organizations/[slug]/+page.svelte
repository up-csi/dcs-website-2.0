<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { onMount, tick } from 'svelte';
	import Hero from '$lib/components/carousels/LabHero.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';
	import ReadMore from '$lib/components/buttons/ReadMore.svelte';

	export let data;
	$: ({ organization } = data);

  	let showFull = false;
</script>

{#if organization}
	<div class="relative z-0">
		<Hero 
			title={organization.name} 
			background_images={[]}
			logo_image={organization.logo ?? ''}
			link={organization.website ?? ''}
		/>
	</div>

	<div class="bg-primary">
		<div class="px-4 space-y-9 pt-9 pb-16 md:max-w-6xl md:space-y-12 md:pt-12 md:pb-20 md:px-10 lg:pl-[302px]">
			<div class="text-2xl font-semibold text-primary-foreground leading-tight md:leading-snug">
				<p>{organization.mission}</p>
			</div>
		
			<InfoCard 
				location="insert organization.location here"
				contact_email={organization.email ?? ''}
				founding_date={organization.founding_date ?? ''}
			/>
		
			<div class="text-lg leading-normal text-primary-foreground">
				<div class="text-lg leading-normal text-primary-foreground">
				  <p
				    class="overflow-hidden transition-all duration-400"
				    class:line-clamp-6={!showFull}
				  >
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

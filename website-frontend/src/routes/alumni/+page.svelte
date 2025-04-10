<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import AlumCard from '$lib/components/cards/AlumCard.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';

	export let data;
	$: ({ alumni_overview, alumni } = data);

	const title = 'Alumni';
</script>

<FullWidthBreakout>
	<Banner {title} background_image={alumni_overview.background_image} />
</FullWidthBreakout>

<div class="pb-16 md:pb-24">
	<div class="pt-2 pb-8 md:py-8">
		<Breadcrumb />
	</div>

	{#if alumni_overview.flexible_content}
		<div class="mb-10 w-full">
			<FlexibleContent content={alumni_overview.flexible_content} />
		</div>
	{/if}

	<p class="heading-text">Notable Alumni</p>
	<CardPanel>
		{#each alumni as alum}
			<AlumCard {alum} />
		{/each}
	</CardPanel>
</div>

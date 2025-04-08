<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import PartnerCard from '$lib/components/cards/PartnerCard.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';

	export let data;
	$: ({ content, partnerships } = data);

	const title = 'Our Partnerships';
</script>

<FullWidthBreakout>
	<Banner {title} />
</FullWidthBreakout>

<div class="pb-16 text-base md:pb-24">
	<div class="py-2 md:py-8">
		<Breadcrumb page_name={title} />
	</div>

		{#if content.flexible_content}
			<div class="mb-10 w-full px-40">
				<FlexibleContent content={content.flexible_content} />
			</div>
		{/if}

	<p class="heading-text">Our Partners</p>
	<CardPanel width={376}>
		{#each partnerships as partner}
			<PartnerCard {partner} />
		{/each}
	</CardPanel>
</div>

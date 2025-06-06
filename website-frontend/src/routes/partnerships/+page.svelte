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

	<div class="space-y-16">
		<div class="prose text-base">
			{#if content.flexible_content}
				<FlexibleContent content={content.flexible_content} />
			{/if}
		</div>

		<p class="heading-text heading-padding">Our Partners</p>
		<CardPanel>
			{#each partnerships as partner}
				<div class="-m-5 grow-0 basis-full p-5 sm:basis-1/2 lg:basis-1/3">
					<PartnerCard {partner} />
				</div>
			{/each}
		</CardPanel>
	</div>
</div>

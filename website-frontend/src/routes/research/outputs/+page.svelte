<script lang="ts">
	/** @type {import('./$types').PageData} */

	import Banner from '$lib/components/banners/Banner.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import type { FilterControls } from '$lib/types/filter_controls.js';

	export let data;

	$: ({ publications } = data);

	let controls: FilterControls = [];
</script>

<FullWidthBreakout>
	<Banner title="Featured Outputs" />
</FullWidthBreakout>

<div class="pb-16 md:pb-24">
	<div class="pb-8 pt-2 md:py-8">
		<Breadcrumb page_name="Featured Outputs" />
	</div>

	<div class="my-12">
		<FilterBar {controls} />
	</div>

	<CardPanel>
		{#each publications as publication}
			{publication}
		{/each}
	</CardPanel>
</div>

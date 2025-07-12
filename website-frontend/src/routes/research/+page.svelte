<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import LaboratoryItem from '$lib/components/list_items/LaboratoryItem.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	export let data;

	$: ({ research, laboratories } = data);

	const title = 'Research';
</script>

<FullWidthBreakout>
	<Banner {title} background_image={research.background_image ?? ''} />
</FullWidthBreakout>

<div class="pb-16 md:pb-24">
	<div class="pb-8 pt-2 md:py-8">
		<Breadcrumb page_name={title} />
	</div>

	<p class="heading-text heading-padding">Research Laboratories</p>

	{#each laboratories as laboratory}
		<LaboratoryItem {laboratory} />
	{/each}
</div>

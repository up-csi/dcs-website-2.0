<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	export let data;

	const { about } = data;
</script>

{#if about}
	<FullWidthBreakout>
		<Banner title="About" />
	</FullWidthBreakout>

	<div class="pb-16 text-base md:pb-24">
		<div class="py-2 md:py-8">
			<Breadcrumb />
		</div>

		{#if about.flexible_content}
			<FlexibleContent content={about.flexible_content} />
		{:else}
			<p>Page is empty.</p>
		{/if}
	</div>
{:else}
	<p>Page not found</p>
{/if}

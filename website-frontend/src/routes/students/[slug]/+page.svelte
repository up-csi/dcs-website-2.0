<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	export let data;

	$: ({ page } = data);
</script>

{#if page}
	<FullWidthBreakout>
		<Banner title={page.title} />
	</FullWidthBreakout>

	<div class="pb-16 md:pb-24">
		<div class="pt-2 pb-8 md:py-8">
			<Breadcrumb />
		</div>

		<div class="mb-10 w-full">
			{#if page.flexible_content}
				<FlexibleContent content={page.flexible_content} />
			{:else}
				<p>Page is empty.</p>
			{/if}
		</div>
	</div>
{:else}
	<p>Page not found</p>
{/if}

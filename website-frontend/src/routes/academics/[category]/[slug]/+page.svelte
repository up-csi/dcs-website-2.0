<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';

	export let data;
	$: ({ academics_page } = data);
</script>

<body>
	{#if academics_page}
		<Banner title={academics_page.title} />

		<div class="container mx-auto my-8 mb-5">
			<Breadcrumb />
		</div>

		<div class="prose px-4 py-10 text-base md:px-32">
			{#if academics_page.flexible_content}
				<FlexibleContent content={academics_page.flexible_content} />
			{:else}
				<p>Page is empty.</p>
			{/if}
		</div>
	{:else}
		<p>Page not found</p>
	{/if}
</body>

<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	export let data;

	$: ({ page } = data);
</script>

<body>
	{#if page}
		<Banner title={page.title} />

		<div class="px-4 py-10 text-base md:px-32">
			{#if page.flexible_content}
				<FlexibleContent content={page.flexible_content} />
			{:else}
				<p>Page is empty.</p>
			{/if}
		</div>
	{:else}
		<p>Page not found</p>
	{/if}
</body>

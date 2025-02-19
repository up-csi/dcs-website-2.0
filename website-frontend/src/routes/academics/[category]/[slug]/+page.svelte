<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banner/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';

	export let data;
	$: ({ academics_page } = data);
</script>

<body>
	{#if academics_page}
		<Banner title={academics_page.title} />

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

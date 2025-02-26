<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	export let data;

	$: ({ news_item } = data);
</script>

<body>
	{#if news_item}
		<!-- TODO: Create a dedicated news banner and frontend page formatting -->
		<Banner
			title={news_item.title}
			flexible_content="{news_item.summary} <br /><br /> Written by {news_item.user_created
				.first_name}
			{news_item.user_created.last_name} | {news_item.date_created}"
			from_bottom={'bottom-40'}
		/>
		<br />

		<div class="px-4 py-10 text-base md:px-32">
			{#if news_item.flexible_content}
				<FlexibleContent content={news_item.flexible_content} />
			{:else}
				<p>Page is empty.</p>
			{/if}
		</div>
	{:else}
		<p>Page not found</p>
	{/if}
</body>

<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	export let data;

	$: ({ page } = data);
</script>

<body>
	{#if page}
		<Banner title={page.title} />

		<div class="mx-20">
			<div class="my-5">
				<Breadcrumb />
			</div>

			<div class="mb-10 w-full px-40">
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
</body>

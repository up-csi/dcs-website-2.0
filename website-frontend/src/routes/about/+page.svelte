<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	export let data;

	const { about } = data;
</script>

<body>
	{#if about}
		<Banner title="About" />

		<div class="px-4 py-10 text-base md:px-32">
			<div class="mb-5">
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
</body>

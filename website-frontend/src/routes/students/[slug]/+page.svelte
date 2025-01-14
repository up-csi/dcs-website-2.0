<script>
	/** @type {import('./$types').PageData} */
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	export let data;

	$: ({ page } = data);
</script>

<body class="bg-gray-100">
	{#if page}
		<div class="relative">
			<div
				class="h-[40vh] bg-cover bg-center md:h-[50vh]"
				style="background-image: linear-gradient(to top, #004420, transparent)"
			></div>
			<div class="absolute bottom-9">
				<h1 class="px-4 text-3xl font-bold md:max-w-[60vw] md:px-32 md:text-5xl">
					{page.title}
				</h1>
			</div>
		</div>

		<div class="px-4 py-10 text-base text-[#01152B] md:px-32">
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

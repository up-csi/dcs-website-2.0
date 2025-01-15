<script>
	/** @type {import('./$types').PageData} */
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	export let data;

	const { about } = data;
</script>

<body>
	{#if about}
		<div class="relative">
			<div
				class="h-[40vh] bg-cover bg-center md:h-[50vh]"
				style="background-image: linear-gradient(to top, hsl(var(--primary)), transparent)"
			></div>
			<div class="absolute bottom-9">
				<h1 class="px-4 text-3xl font-bold md:max-w-[60vw] md:px-32 md:text-5xl text-primary-foreground">About</h1>
			</div>
		</div>

		<div class="prose px-4 py-10 text-base md:px-32">
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

<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banner/Banner.svelte';
	import LoadMore from '$lib/components/load_more/LoadMore.svelte';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let data;
	const { publications } = data;

	const inc = 12;
	let shown = inc;
	$: publicationsList = publications?.slice(0, shown);
</script>

<body>
	<div class="relative z-0">
		<Banner title="Publications" />
	</div>

	<div
		class="mx-auto my-3 grid
        max-w-[94vw] grid-cols-2 gap-2 pb-20
        md:my-8 md:max-w-[80vw] md:grid-cols-4 md:gap-4"
	>
		{#each publicationsList as publication}
			<a href="/publications/{publication.id}">
				<img
					src="{PUBLIC_APIURL}/assets/{publication.hero_image}"
					alt={publication.title}
					class="h-48 w-full object-cover rounded-lg"
				/>
				<p>{publication.title}</p>
				{#each publication.authors as author}
					<p>{author.last_name}, {author.first_name}</p>
				{/each}
			</a>
		{/each}
	</div>
	{#if shown < publications.length}
		<div class="flex items-center justify-center">
			<LoadMore {inc} bind:shown />
		</div>
	{/if}
</body>

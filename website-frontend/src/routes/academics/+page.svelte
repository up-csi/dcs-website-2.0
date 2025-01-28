<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banner/Banner.svelte';
	export let data;

	const title = 'Academics';
</script>

<Banner {title} flexible_content={`This is the ${title} page.`} />

<ul>
	{#each data.programs as { slug, title }}
		<li><a href="/academics/{slug}">{title}</a></li>
	{/each}
</ul>

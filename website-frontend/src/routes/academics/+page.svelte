<script>
    export let data; 
</script>

<h1>Academics</h1>

<ul>
	{#each data.programs as { slug, title }}
		<li><a href="/academics/{slug}">{title}</a></li>
	{/each}
</ul>
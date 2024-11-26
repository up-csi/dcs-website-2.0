<script>
    let academics = [
        {slug: "bs-cs", title:"Bachelor of Science in Computer Science", image:"...", description: "owo"},
        {slug: "ms-cs", title:"Master of Science in Computer Science", image:"...", description: "owo"},
        {slug: "ms-bioinformatics", title:"Master of Science in Bioinformatics", image:"...", description: "owo"},
        {slug: "phd-cs", title:"Doctor of Philosophy in Computer Science", image:"...", description: "owo"},
        ]
</script>

<div class="text-white">
    <h1>Academics</h1>

    <ul>
    	{#each academics as { slug, title }}
    		<li><a href="/academics/{slug}">{title}</a></li>
    	{/each}
    </ul>
</div>

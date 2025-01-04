<script lang="ts">
    /** @type {import('./$types').PageData} */

    import { PUBLIC_APIURL } from "$env/static/public";

	export let data;

	$: ({ laboratories } = data);
</script>

<div class="container h-full mx-auto flex-col justify-center items-center my-8">
    <p>The Department of Computer Science houses nine research laboratories catering to theoretical and applied fields in computer science.</p>

    {#each laboratories as laboratory}
        <div class="my-5 grid grid-cols-6 items-center py-5 border-b">
            <div>
                <img src="{PUBLIC_APIURL}/assets/{laboratory.logo}" alt={laboratory.name} />
            </div>
            <div class="col-span-5 pl-5">
                <div class="flex items-center">
                    <h3 class="mr-5">{laboratory.name}</h3>
                    <a href="/research/labs/{laboratory.slug}">View Lab &#8594;</a>
                </div>
                <p class="max-h-12 line-clamp-2 overflow-hidden">{laboratory.description}</p>
            </div>
        </div>
    {/each}
</div>
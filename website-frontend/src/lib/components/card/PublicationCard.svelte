<script lang="ts">
    import { ScrollText } from "lucide-svelte";
    import { PUBLIC_URL } from "$env/static/public";

    export let publication;
</script>

<div class="relative card bg-transparent flex flex-col rounded-none shadow-none">
    <div class="absolute bottom-0 w-full shadow-xl rounded-lg" style="height: calc(var(--card-height) * (8 / 9));" />

    <div 
        class="*:rounded-lg grow w-full flex justify-center"
    >
        {#if publication.image}
            <img 
                src="{PUBLIC_URL}/assets/{publication.image}"
                alt={publication.title}
                style="width: calc(var(--card-height) * (19 / 45));"
            />
        {:else}
            <div 
                class="bg-muted h-full flex justify-center items-center"
                style="width: calc(var(--card-height) * (19 / 45));"
            >
                <ScrollText class="bg-muted text-muted-foreground h-20 w-20" />
            </div>
        {/if}
    </div>
    <div class="p-2">
        <p class="text-lg text-center mx-2 my-4 line-clamp-4 font-bold">{publication.title}</p>
        <div class="flex justify-between w-full *:text-sm">
            <p class="text-muted-foreground">{publication.authors[0]}</p>
            <p class="text-secondary">{new Date(publication.date_published).toLocaleDateString()}</p>
        </div>
    </div>
</div>
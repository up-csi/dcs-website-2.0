<script lang="ts">
    import type { Alumnus } from '$lib/types/alumni';
    import * as Card from '$lib/@shadcn-svelte/ui/card';
    import { Image } from 'lucide-svelte';
	import { PUBLIC_APIURL } from '$env/static/public';

    export let alumnus: Alumnus;
    $: ({ batch, img, name, accolades } = alumnus);
</script>

<Card.Root class="border-0 h-[396px] card">
    <Card.Content class="card h-full w-full p-3 flex flex-col">
        <div class="flex justify-center items-center bg-secondary rounded-lg w-64 py-24">
            {#if img}
                <img src="{PUBLIC_APIURL}/assets/{img}" alt={name} />
            {:else}
                <Image class="h-10 w-10 my-3 text-background" />
            {/if}
        </div>

        <div class="text-center w-full h-full flex grow flex-col items-center pt-1 *:mt-1 overflow-hidden">
            <p class="text-muted-foreground text-xs font-semibold">Batch {batch}</p>
            <p class="font-bold text-2xl text-foreground">{name}</p>
            {#each accolades as accolade}
                <p class="text-secondary text-xs">{accolade}</p>
            {/each}
        </div>
    </Card.Content>
</Card.Root>
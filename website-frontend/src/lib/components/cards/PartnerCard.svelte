<script lang="ts">
    import type { Partner } from "$lib/types/partners";
    import * as Card from '$lib/@shadcn-svelte/ui/card';
    import { Image } from 'lucide-svelte';
	import { PUBLIC_APIURL } from '$env/static/public';

    export let partner: Partner;
    $: ({ src, name, description } = partner);
</script>

<Card.Root class="border-0 h-[286px] w-[376px] card">
    <Card.Content class="card h-full w-full p-3">
        <div class="flex">
            {#if src}
                <img src="{PUBLIC_APIURL}/assets/{src}" alt={name} />
            {:else}
                <div class="flex justify-center items-center bg-secondary rounded-full h-32 w-32">
                    <Image class="h-10 w-10 text-background" />
                </div>
            {/if}
        </div>

        <div class="w-full h-full flex grow flex-col pt-1 *:mt-2">
            <p class="font-bold text-xl text-primary">{name}</p>
            <p class="text-secondary text-sm">{description}</p>
        </div>
    </Card.Content>
</Card.Root>
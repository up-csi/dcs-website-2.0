<script lang="ts">
    import { Image } from "lucide-svelte";
	import { PUBLIC_APIURL } from "$env/static/public";

    export let organization;
    $: ({ name, logo, description, email, website } = organization);
</script>

<div class="grid rounded-lg text-background p-10 my-4 flex justify-start gap-6" style="background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)/0.25)); grid-template-columns: 1fr auto;">
    <a href={website} target="_blank">
        {#if logo}
            <div class="flex justify-center items-center h-40 w-40">
                <img src="{PUBLIC_APIURL}/assets/{logo}" alt={name} class="max-w-40 max-h-40" />
            </div>
        {:else}
            <div class="rounded-full bg-secondary h-40 w-40 flex justify-center items-center">
                <Image class="h-10 w-10 text-background" />
            </div>
        {/if}
    </a>

    <div class="flex flex-col justify-center *:my-2">
        <p class="font-bold text-3xl">{name}</p>
        <p class="line-clamp-2 text-sm">{description}</p>
        <div class="*:pr-4">
            <a href="mailto:{email}">Email</a>
            <a href={website} target="_blank">Website</a>
        </div>
    </div>
</div>
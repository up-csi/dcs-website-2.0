<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';

    export let image: string | null | undefined, name: string;
</script>

<div class="grid gap-5 items-center justify-start border-b py-2" style="grid-template-columns: 1fr 3fr;">
    <div class="w-full h-36 sm:h-60 lg:h-96 p-2 rounded-lg overflow-hidden shadow-none flex items-center justify-center">
        {#if image}
            <img src="{PUBLIC_APIURL}/assets/{image}" alt="{name}" class="rounded-lg max-h-full max-w-full" />
        {/if}
    </div>
    
    <div class="w-full">
        <slot />
    </div>
</div>
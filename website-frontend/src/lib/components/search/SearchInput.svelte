<script lang="ts">
    import { Search, X } from 'lucide-svelte';

    export let search_open = false;
    let typing = false;

    let input_display = "hidden";
    let border_display = "border-0";
    $: if (search_open) {
        input_display = "block";
        border_display = "border";
    } else {
        input_display = "hidden";
        border_display = "border-0";
    }

    let txt_area: any;
</script>

<div class="h-fit w-full">
    <form action="" class="rounded-3xl border lg:{border_display}">
        <div class="flex items-center w-full pr-1 pl-3">
            <input type="text" class="focus:outline-none w-full lg:{input_display}" bind:this={txt_area} on:input={() => { typing = true; }} />

            {#if typing}
                <button class="h-10 w-10 flex items-center justify-center mr-2" on:click={() => { txt_area.value = ""; typing = false; }}><X class="h-8 w-8 bg-secondary rounded-3xl p-1" /></button>
            {:else}
                <button type="submit" class="h-10 w-10 flex items-center justify-center" on:click={() => { search_open = !(search_open); }}><Search class="h-10 text-secondary hover:text-primary" /></button>
            {/if}
        </div>
    </form>
</div>
<script lang="ts">
    import type { FilterControl } from "./filter_controls";
    import { ChevronUp, ChevronDown } from 'lucide-svelte';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    export let control: FilterControl;
    $: ({ name, categories } = control);

    let hide = true;
</script>

<DropdownMenu.Root onOutsideClick={() => {hide = true}}>
    <DropdownMenu.Trigger>
        <button class="flex items-center md:rounded-3xl md:border-2 px-4 py-1 text-sm" on:click={() => {hide = !hide}}>
            <span>{name}</span>
            {#if hide}
                <ChevronDown class="h-4 w-4 ml-2" />
            {:else}
                <ChevronUp class="h-4 w-4 ml-2" />
            {/if}
        </button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        {#if categories}
            <DropdownMenu.Group>
                {#each categories as { categoryName, checked }}
                    <DropdownMenu.CheckboxItem bind:checked onCheckedChange={() => {hide = true}}>{categoryName}</DropdownMenu.CheckboxItem>
                {/each}
            </DropdownMenu.Group>
        {/if}
    </DropdownMenu.Content>
</DropdownMenu.Root>


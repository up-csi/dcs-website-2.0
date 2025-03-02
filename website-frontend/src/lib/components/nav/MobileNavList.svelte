<script lang="ts">
    import * as Accordion from "$lib/@shadcn-svelte/ui/accordion";
	import { ScrollArea } from '$lib/@shadcn-svelte/ui/scroll-area/index.js';

    export let open: boolean;
</script>

<ScrollArea class='w-full'>
    <a href="/" class="font-bold text-xl" on:click={() => { open = false; }}>Home</a>
    <Accordion.Root>
        <Accordion.Item value="item-1" class="border-0">
            <Accordion.Trigger><a href="/people" class="font-bold text-xl" on:click={() => { open = false; }}>People</a></Accordion.Trigger>
            <Accordion.Content>
                <a href="/people/regular-faculty" on:click={() => { open = false; }}>Regular Faculty</a>
                <br />
                <a href="/people/lecturers-and-teaching-associates" on:click={() => { open = false; }}>Lecturers and Teaching Associates</a>
                <br />
                <a href="/people/support-staff" on:click={() => { open = false; }}>Support Staff</a>
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</ScrollArea>
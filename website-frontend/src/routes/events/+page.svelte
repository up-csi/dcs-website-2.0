<script lang="ts">
    import { Events } from "$lib/models/event";
    import FeaturedEventCard from "$lib/components/events/FeaturedEventCard.svelte";

	/** @type {import('./$types').PageData} */
	export let data;

	$: ({ events } = data);

    let featured: Events = [];
    $: featured = events?.slice(0, 3);
</script>

<div class="container h-full mx-auto flex-col justify-center items-center my-8">
	<div class="flex my-12 space-x-8">
        {#each featured as event}
            <FeaturedEventCard {event} />
        {/each}
    </div>
</div>

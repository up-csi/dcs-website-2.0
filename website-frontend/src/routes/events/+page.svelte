<script lang="ts">
    import FeaturedEventCard from "$lib/components/events/FeaturedEventCard.svelte";
	/** @type {import('./$types').PageData} */

	export let data;

	$: ({ events } = data);
</script>

<div class="container h-full mx-auto flex-col justify-center items-center my-8">
	<div class="flex my-12 space-x-8">
        {#each events as event}
            <FeaturedEventCard {event} />
        {/each}
    </div>
</div>

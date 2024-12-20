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
    <div>
        {#each events as event}
            <div class="grid grid-cols-6 border rounded p-4">
                <div class="col-span-5">
                    <h3>{event.event_headline}</h3>
                    <div class="max-h-6 *:truncate overflow-hidden">
                        {@html event.event_content}
                    </div>
                    <a>View details &#8594;</a>
                    <div class="flex items-center">
                        <p>Tags: </p>
                        {#each event.tags as tag}
                            <p class="border rounded px-2 py-1 mx-2">{tag}</p>
                        {/each}
                    </div>
                </div>
                <div class="place-content-center">
                    <h3>{new Date(event.date_created).toLocaleDateString()}</h3>
                </div>
            </div>
        {/each}
    </div>
</div>

<script lang="ts">
	/** @type {import('./$types').PageData} */

	export let data;

	$: ({ events } = data);
</script>

<div class="container h-full mx-auto flex-col justify-center items-center my-8">
	<div class="flex my-12 space-x-8">
        {#each events as event}
            <div class="card p-4 w-96 h-48">
                <div class="flex justify-between mb-4">
                    <h3>{event.event_headline}</h3>
                    <h3>{new Date(event.date_created).toLocaleDateString()}</h3>
                </div>
                {@html event.event_content}
            </div>
        {/each}
    </div>
</div>

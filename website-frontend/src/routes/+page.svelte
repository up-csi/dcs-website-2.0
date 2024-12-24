<script lang="ts">
	/** @type {import('./$types').PageData} */

	export let data;

	$: ({ global, events } = data);
</script>

<div class="container mx-auto my-8 h-full flex-col items-center justify-center">
	<div class="space-y-5">
		<h1 class="h1">{global.title}</h1>
		<p>{global.description}</p>
	</div>
	<div class="my-12 flex space-x-8">
		{#each events as event}
			<div class="card h-48 w-96 p-4">
				<div class="mb-4 flex justify-between">
					<h3>{event.event_headline}</h3>
					<h3>{new Date(event.date_created).toLocaleDateString()}</h3>
				</div>
				{@html event.event_content}
			</div>
		{/each}
	</div>
</div>

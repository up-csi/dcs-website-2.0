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
	<div>
		<div class="flex justify-between">
			<h2>Events</h2>
			<a href="/events">View all &#8594;</a>
		</div>
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
</div>

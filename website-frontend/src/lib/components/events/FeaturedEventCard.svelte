<script lang="ts">
	import { Event } from '$lib/models/event';
	export let event: Event;
</script>

<a href="/events/{event.slug}">
	<div class="card h-fit w-72 max-w-72 snap-center p-4 md:w-96 md:max-w-96">
		<div class="mb-4 md:flex md:justify-between">
			<h3>{event.event_headline}</h3>
			<h3>{new Date(event.date_created).toLocaleDateString()}</h3>
		</div>
		<div class="max-h-6 overflow-hidden *:truncate">
			{@html event.event_content}
		</div>
		<p>View details &#8594;</p>
	</div>
</a>

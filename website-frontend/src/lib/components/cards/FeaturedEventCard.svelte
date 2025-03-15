<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Event } from '$lib/models/event';
	import { Calendar, MapPin } from 'lucide-svelte';
	export let item: Event;
</script>

<a href="/events/{item.slug}" data-sveltekit-reload>
	<div
		class="relative flex h-[25rem] flex-col rounded-lg bg-white text-gray-800 shadow-xl"
	>
		<div class="inset-0 h-24 flex-grow rounded-t-lg bg-gray-300 md:h-44">
			{#if item.hero_image}
				<img
					class="h-full w-full rounded-t-lg object-cover"
					src="{PUBLIC_APIURL}/assets/{item.hero_image}"
					alt="Background"
				/>
			{/if}
		</div>

		<div class="space-y-2 p-4">
			<div class="line-clamp-3 text-lg font-bold">
				<h1>{item.event_headline}</h1>
			</div>
			<div class="flex items-center space-x-2 text-sm font-medium">
				<Calendar class="h-4 w-4" />
				<p>
					{new Date(item.start_date).toLocaleDateString('en-US', {
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					})}
					{#if item.end_date}
						- {new Date(item.end_date).toLocaleDateString('en-US', {
							month: 'long',
							day: 'numeric',
							year: 'numeric'
						})}
					{/if}
				</p>
			</div>
			{#if item.display_location}
				<div class="flex items-center space-x-2 text-sm text-gray-500">
					<MapPin class="h-4 w-4" />
					<p>{item.display_location}</p>
				</div>
			{/if}
			{#if item.event_tags}
				<div class="py-1 text-xs font-bold text-gray-600">
					{#each item.event_tags as tag, index}
						{#if typeof tag !== 'string' && typeof tag.events_tags_id !== 'string'}
							<p>{tag.events_tags_id.name}{index < item.event_tags.length - 1 ? ',' : ''}</p>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
</a>

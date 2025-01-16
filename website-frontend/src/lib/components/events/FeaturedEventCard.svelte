<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Event } from '$lib/models/event';
	import { Calendar, MapPin } from 'lucide-svelte';
	export let event: Event;
</script>

<a href="/events/{event.slug}">
	<div class="relative flex h-[25rem] flex-col overflow-hidden rounded-lg bg-white shadow-xl text-gray-800">

		<div class="inset-0 flex-grow h-24 rounded-t-lg bg-gray-300 md:h-44">
			{#if event.hero_image}
				<img
					class="h-full w-full rounded-t-lg object-cover"
					src="{PUBLIC_APIURL}/assets/{event.hero_image}"
					alt="Background"
				/>
			{/if}
		</div>

		<div>
			<div class="absolute rounded-full w-6 h-6 bg-slate-100 shadow-inner -mt-2 -left-3"></div>
			<div class="absolute rounded-full w-6 h-6 bg-slate-100 shadow-inner -mt-2 -right-3"></div>
		</div>

		<div class="p-4 space-y-2">
			<div class="font-bold text-lg">
				<h1>{event.event_headline}</h1>
			</div> 
			<div class="font-medium text-sm space-x-2 flex items-center">
				<Calendar class="h-4 w-4" />
				<p>7 - 8 February 2025</p> 
			</div>
			{#if event.location}
				<div class="text-sm text-gray-500 space-x-2 flex items-center">
					<MapPin class="h-4 w-4" />
					<p>{event.location}</p> 
				</div>
			{/if}
			{#if event.tags}
				<div class="font-bold text-xs text-gray-600 py-1">
					{#each event.tags as tag, index}
						<p>{tag}{index < (event.tags.length - 1) ? ',' : ''}</p> 
					{/each}
				</div>
			{/if}
		</div>

	</div>
</a>

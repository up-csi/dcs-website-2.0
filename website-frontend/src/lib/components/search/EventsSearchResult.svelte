<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Event } from '$lib/models/events';

	export let item: Event;

	let general_banner_height: number;
</script>

<a href={`/events/${item.slug}`}>
	<div
		class="flex flex-col items-center justify-start gap-2 border-b py-5 text-center sm:flex-row sm:text-start"
	>
		{#if item.hero_image}
			<div
				class="flex h-36 w-full flex-col items-center justify-center overflow-hidden rounded-lg p-2 shadow-none md:w-2/5"
				bind:clientHeight={general_banner_height}
			>
				{#if general_banner_height}
					<img
						src="{PUBLIC_APIURL}/assets/{item.hero_image}?height={general_banner_height}"
						alt={item.event_headline}
						class="h-full w-full rounded-lg object-cover"
					/>
				{/if}
			</div>
		{/if}

		<div class="w-full">
			<p class="text-xl font-bold">{item.event_headline}</p>
			{#if item.event_content}
				<p class="line-clamp-2">{@html item.event_content}</p>
			{/if}
		</div>
	</div>
</a>

<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import { NewsItem } from '$lib/models/news';
	import { Image } from 'lucide-svelte';
	export let item: NewsItem;
</script>

<a href="/news/{item.slug}" data-sveltekit-reload>
	<div
		class="relative flex h-[25rem] flex-col rounded-lg bg-white text-gray-800 shadow-md mb-2 group"
	>
	<div class="inset-0 h-24 flex-grow rounded-t-lg md:h-44 overflow-hidden
		{item.background_image ? '' : 'bg-gradient-to-b from-[#D1D8DD] to-[#66708076] flex items-center justify-center'}"
	>
		{#if item.background_image}
			<div class="h-full w-full">
				<img
				  class="h-full w-full rounded-t-lg object-cover transition-transform duration-300 ease-out group-hover:scale-105"
				  src="{PUBLIC_APIURL}/assets/{item.background_image}"
				  alt="Background"
				/>
		  	</div>
		{:else}
			<Image class="h-8 w-8 text-white opacity-70" />
		{/if}
	</div>

		<div class="space-y-4 p-4">
			<h1 class="line-clamp-3 text-[17px] font-bold leading-tight">{item.title}</h1>
			<p class="line-clamp-2 text-[13px] opacity-60 leading-tight">{item.summary}</p>
			<div class="flex justify-between">
				<p class="uppercase py-1 text-[11px] font-bold opacity-60 flex flex-wrap gap-1 leading-none"> tag </p>
				<p class="text-[11px] font-medium opacity-60">
					{new Date(item.date_created).toLocaleDateString('en-GB', {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})}</p>
			</div>
		</div>
	</div>
</a>
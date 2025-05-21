<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import { NewsItem } from '$lib/models/news';
	import { Image } from 'lucide-svelte';
	import { error } from '@sveltejs/kit';

	export let item: NewsItem;
	const news_tags = item.news_tags
		.filter((item) => typeof item !== 'string')
		.map(({ news_tags_id }) => {
			if (typeof news_tags_id !== 'string') return news_tags_id.name;
			else error(500);
		});
</script>

<a href="/news/{item.slug}" data-sveltekit-reload>
	<div
		class="group relative mb-2 flex h-[25rem] flex-col rounded-lg bg-white text-gray-800 shadow-md"
	>
		<div
			class="inset-0 h-24 flex-grow overflow-hidden rounded-t-lg md:h-44
		{item.background_image
				? ''
				: 'flex items-center justify-center bg-gradient-to-b from-[#D1D8DD] to-[#66708076]'}"
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
			<p class="line-clamp-2 text-[13px] leading-tight opacity-60">{item.summary}</p>
			<div class="flex justify-between">
				<p class="flex flex-wrap gap-1 py-1 text-[11px] font-bold leading-none opacity-60">
					{#if news_tags.length !== 0}
						<span class="uppercase">
							{news_tags[0]}
						</span>
					{/if}
					{#if news_tags.slice(1).length !== 0}
						<span>
							+ {news_tags.slice(1).length} other {#if news_tags.slice(1).length === 1}
								tag
							{:else}
								tags
							{/if}
						</span>
					{/if}
				</p>
				<p class="text-[11px] font-medium opacity-60">
					{new Date(item.date_created).toLocaleDateString('en-GB', {
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					})}
				</p>
			</div>
		</div>
	</div>
</a>

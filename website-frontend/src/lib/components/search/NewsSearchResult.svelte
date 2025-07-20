<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import { NewsItem } from '$lib/models/news';

	export let item: NewsItem;

	let general_banner_height: number;
</script>

<a href={`/news/${item.slug}`}>
	<div
		class="flex flex-col items-center justify-start gap-2 border-b py-5 text-center sm:flex-row sm:text-start"
	>
		{#if item.background_image}
			<div
				class="flex h-36 w-full flex-col items-center justify-center overflow-hidden rounded-lg p-2 shadow-none md:w-2/5"
				bind:clientHeight={general_banner_height}
			>
				{#if general_banner_height}
					<img
						src="{PUBLIC_APIURL}/assets/{item.background_image}?height={general_banner_height}"
						alt={item.title}
						class="h-full w-full rounded-lg object-cover"
					/>
				{/if}
			</div>
		{/if}

		<div class="w-full">
			<p class="text-xl font-bold">{item.title}</p>
			{#if item.summary}
				<p class="line-clamp-2">{item.summary}</p>
			{/if}
		</div>
	</div>
</a>

<script lang="ts">
	import * as Card from '$lib/@shadcn-svelte/ui/card';
	import { PUBLIC_APIURL } from '$env/static/public';
	import { NewsItem } from '$lib/models/news';
	import { ScrollText } from 'lucide-svelte';
	export let news_item: NewsItem;
</script>

<a href="/news/{news_item.slug}" data-sveltekit-reload>
	<Card.Root class="flex h-80 w-80 flex-col justify-end rounded-lg">
		<div class="flex min-h-0 flex-1 justify-center">
			{#if news_item.background_image}
				<img
					src="{PUBLIC_APIURL}/assets/{news_item.background_image}"
					alt={news_item.title}
					class="w-full object-cover"
				/>
			{:else}
				<div class="flex w-full items-center justify-center bg-muted">
					<ScrollText class="w-20 bg-muted text-muted-foreground" />
				</div>
			{/if}
		</div>
		<Card.Header>
			<Card.Title class="line-clamp-2">{news_item.title}</Card.Title>
		</Card.Header>
		<Card.Content>
			<Card.Description class="line-clamp-2">{news_item.summary}</Card.Description>
		</Card.Content>
		<Card.Footer>
			<small>Stuff</small>
		</Card.Footer>
	</Card.Root>
</a>

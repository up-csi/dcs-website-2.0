<script>
	/** @type {import('./$types').PageData} */
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel';
	import NewsCard from '$lib/components/cards/NewsCard.svelte';
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import { PUBLIC_APIURL } from '$env/static/public';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import { Share } from 'lucide-svelte';
	export let data;

	$: ({ other_news, news_item } = data);
</script>

<body>
	{#if news_item}
		<div class="flex flex-col gap-y-5">
			{#if news_item.background_image}
				<div class="mt-24 h-full px-5">
					<img
						class="h-[60svh] w-full object-cover"
						src="{PUBLIC_APIURL}/assets/{news_item.background_image}"
						alt="Background"
					/>
				</div>
			{/if}
			<div
				class="container mx-auto flex flex-col justify-center gap-y-5 pb-16"
				class:mt-8={news_item.background_image}
				class:mt-24={!news_item.background_image}
			>
				<h1 class="text-6xl font-bold">{news_item.title}</h1>
				<p class="text-xl">{news_item.summary}</p>
				<div class="flex justify-between">
					<div class="flex flex-col">
						<small
							>Written by {news_item.user_created.first_name}
							{news_item.user_created.last_name}</small
						>
						<small class="text-gray-500"
							>Published on {new Date(news_item.date_created).toLocaleDateString('en-US', {
								month: 'long',
								day: 'numeric',
								year: 'numeric'
							})} | {new Date(news_item.date_created).toLocaleTimeString('en-US', {
								timeZone: 'PST',
								timeZoneName: 'short'
							})}
						</small>
					</div>
					<Button variant="outline" class="flex gap-x-2 rounded-full"
						>Share <Share class="size-4" /></Button
					>
				</div>
			</div>
		</div>
		<div class="bg-gray-100 pb-24 pt-16">
			<div class="container">
				{#if news_item.flexible_content}
					<FlexibleContent content={news_item.flexible_content} />
				{:else}
					<p>Page is empty.</p>
				{/if}
			</div>
		</div>
	{:else}
		<p>Page not found</p>
	{/if}
	<div class="bg-primary py-24 text-primary-foreground">
		<div class="container flex h-full flex-col gap-y-8">
			<h2 class="text-xl font-bold md:text-2xl">More News from UPD DCS</h2>
			<Carousel.Root>
				<Carousel.Content>
					{#each other_news as news_item}
						<Carousel.Item class="basis-full md:basis-1/4">
							<NewsCard {news_item} />
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<Carousel.Next class="bg-primary" />
			</Carousel.Root>
		</div>
	</div>
</body>

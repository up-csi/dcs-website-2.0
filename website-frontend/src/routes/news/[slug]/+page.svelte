<script>
	/** @type {import('./$types').PageData} */
	import NewsCard from '$lib/components/cards/NewsCard.svelte';
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import { PUBLIC_APIURL } from '$env/static/public';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import { Share } from 'lucide-svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import CardCarousel from '$lib/components/carousels/CardCarousel.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	export let data;

	$: ({ other_news, news_item } = data);

	$: publish_date = new Date(news_item.date_created ?? 0).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	$: publish_time = new Date(news_item.date_created ?? 0).toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		timeZone: 'PST',
		timeZoneName: 'short'
	});
</script>

{#if news_item}
	<FullWidthBreakout>
		<div class="flex flex-col gap-y-5 bg-white">
			<div class="md:mt-16 md:px-6">
				<Breadcrumb page_name={news_item.title} />
			</div>

			{#if news_item.background_image}
				<div class="h-full px-5">
					<img
						class="h-[40svh] w-full object-cover md:h-[60svh]"
						src="{PUBLIC_APIURL}/assets/{news_item.background_image}?height=720"
						alt="Background"
					/>
				</div>
			{/if}
			<div
				class="mx-auto flex w-full max-w-[1220px] flex-col gap-y-5 px-4 pb-16 md:px-14 2xl:max-w-screen-2xl"
				class:mt-8={news_item.background_image}
				class:mt-24={!news_item.background_image}
			>
				<h1 class="text-3xl font-bold md:text-6xl">{news_item.title}</h1>
				{#if news_item.summary}
					<p class="md:text-xl">{news_item.summary}</p>
				{/if}
				<div class="flex justify-between">
					<div class="flex flex-col">
						{#if typeof news_item.user_created === 'object' && news_item.user_created.first_name && news_item.user_created.last_name}
							<small
								>Written by {news_item.user_created.first_name}
								{news_item.user_created.last_name}</small
							>
						{/if}
						<small class="text-gray-500">Published on {publish_date} | {publish_time} </small>
					</div>
					<Button variant="outline" class="flex gap-x-2 rounded-full"
						>Share <Share class="size-4" /></Button
					>
				</div>
			</div>
		</div>
	</FullWidthBreakout>

	<div class="pb-24 pt-16">
		<div class="md:px-6">
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

<FullWidthBreakout>
	<div class="bg-background-dark py-24 text-primary-foreground">
		<div class="container flex h-full flex-col gap-y-8">
			<h2 class="heading-text">More News from UPD DCS</h2>
			<CardCarousel CardComponent={NewsCard} items={other_news} />
		</div>
	</div>
</FullWidthBreakout>

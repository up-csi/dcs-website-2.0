<script>
	/** @type {import('./$types').PageData} */
	import NewsCard from '$lib/components/cards/NewsCard.svelte';
	import { PUBLIC_APIURL } from '$env/static/public';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import Share from '$lib/components/buttons/Share.svelte';
	export let data;

	$: ({ link, other_news, news_item } = data);

	$: news_tags = news_item.news_tags
		? news_item.news_tags
				.filter((tag) => typeof tag === 'object')
				.map(({ news_tags_id }) => {
					if (typeof news_tags_id === 'object') return news_tags_id.name;
				})
				.filter((tag) => typeof tag !== 'undefined')
		: [];

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
			<div class="px-6 lg:mt-16">
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
				class="mx-auto flex w-full max-w-[1220px] flex-col gap-y-5 px-8 pb-16 md:px-16 2xl:max-w-screen-2xl"
				class:mt-8={news_item.background_image}
				class:mt-24={!news_item.background_image}
			>
				{#if news_tags.length !== 0}
					<div class="flex border-l-[5px] border-primary-dark pl-2 font-bold">
						<small class="capitalize">
							{#each news_tags.slice(0, -1) as news_tag}
								{`${news_tag}, `}
							{/each}
							{news_tags.at(-1)}
						</small>
					</div>
				{/if}
				<h1 class="text-3xl font-bold md:text-4xl lg:text-5xl xl:text-6xl">{news_item.title}</h1>
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
					<Share {link} />
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
	<div class="flex justify-center bg-background-dark text-primary-foreground">
		<div class="max-w-[1330px] px-8 py-16 md:px-16 md:py-24 2xl:max-w-screen-2xl">
			<h2 class="heading-text heading-padding text-center">More News from UPD DCS</h2>
			<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each other_news as news_item}
					<NewsCard item={news_item} />
				{/each}
			</div>
		</div>
	</div>
</FullWidthBreakout>

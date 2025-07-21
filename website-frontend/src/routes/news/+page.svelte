<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import NewsCard from '$lib/components/cards/NewsCard.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import Await from '$lib/components/loading/Await.svelte';

	export let data;

	$: ({ news_overview, news_count, news } = data);
</script>

<FullWidthBreakout>
	<Banner title="News" background_image={news_overview.background_image ?? ''} />
</FullWidthBreakout>

<FullWidthBreakout>
	<div class="flex justify-center bg-background-dark text-primary-foreground">
		<div class="max-w-[1330px] px-4 py-16 md:px-8 md:py-24 2xl:max-w-screen-2xl">
			<h2 class="heading-text heading-padding text-center">News from UPD DCS</h2>
			<Await
				onDark
				layout="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
				data={news}
				text="news"
				component={NewsCard}
				count={news_count}
			/>
		</div>
	</div>
</FullWidthBreakout>

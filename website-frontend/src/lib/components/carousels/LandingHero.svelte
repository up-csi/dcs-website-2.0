<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel/index';
	import type { CarouselAPI } from '$lib/@shadcn-svelte/ui/carousel/context';
	import Autoplay from 'embla-carousel-autoplay';
	import Fade from 'embla-carousel-fade';
	import { Button } from '$lib/@shadcn-svelte/ui/button';

	const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });

	export let news;
	let api: CarouselAPI;
	let current = 0;
	let count = 0;

	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;

		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	}
</script>

<div>
	<Carousel.Root
		bind:api
		plugins={[plugin, Fade()]}
		on:mousenter={plugin.stop}
		on:mouseleave={plugin.reset}
	>
		<Carousel.Content>
			{#each news as news_item}
				<Carousel.Item class="relative flex h-[90vh] flex-col items-center justify-end">
					<img
						src="{PUBLIC_APIURL}/assets/{news_item.background_image}"
						alt="Carousel Item"
						class="absolute h-full w-full object-cover"
					/>
					<div
						class="container absolute mx-auto flex flex-col items-center gap-y-5 pb-14 text-center text-secondary-foreground md:items-start md:text-left"
					>
						<h1 class="text-2xl font-bold md:text-4xl">{news_item.title}</h1>
						<p class="text-xs font-semibold md:text-base">{news_item.summary}</p>
						<small class="text-xs md:text-sm">
							by {news_item.user_created.first_name}
							{news_item.user_created.last_name}
						</small>
						<Button class="w-fit rounded-full px-5" href="/news/{news_item.slug}">Read Story</Button
						>
						<div class="flex gap-x-2 text-sm font-semibold text-secondary-foreground">
							{#each [...Array(count).keys()] as index}
								{#if index + 1 === current}
									<div class="h-2 w-6 rounded-full bg-white"></div>
								{:else}
									<button
										class="h-2 w-2 rounded-full bg-gray-300"
										on:click={() => api.scrollTo(index)}
									></button>
								{/if}
							{/each}
						</div>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>
</div>

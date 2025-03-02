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
		class="relative h-[90vh] w-full"
		on:mousenter={plugin.stop}
		on:mouseleave={plugin.reset}
	>
		<Carousel.Content>
			{#each news as news_item}
				<Carousel.Item class="relative h-full">
					<img
						src="{PUBLIC_APIURL}/assets/{news_item.background_image}"
						alt="Carousel Item"
						class="relative h-[90vh] w-full"
					/>
					<div class="absolute bottom-28 text-secondary-foreground md:px-20">
						<h1 class="mb-5 text-4xl font-bold">{news_item.title}</h1>
						<p class="text-md mb-5 font-semibold">{news_item.summary}</p>
						<Button href="/news/{news_item.slug}">Read Story</Button>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>
	<div class="absolute -mt-20 text-sm font-semibold text-secondary-foreground md:px-20">
		Item {current} of {count}
	</div>
</div>

<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import Autoplay from 'embla-carousel-autoplay';
	import { Button } from '$lib/components/ui/button';

	const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });

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
		plugins={[plugin]}
		class="relative h-[90vh] w-full"
		on:mousenter={plugin.stop}
		on:mouseleave={plugin.reset}
	>
		<Carousel.Content>
			{#each Array(6) as _}
				<Carousel.Item class="relative h-full">
					<img
						src="source/to/image"
						alt="Carousel Item"
						class="relative h-[90vh] w-full bg-slate-400"
					/>
					<div class="hidden">{_}</div>
					<div class="absolute bottom-28 text-white md:px-20">
						<h1 class="mb-5 text-4xl font-bold">Some Big Bold Description Text</h1>
						<p class="text-md mb-5 font-semibold">Some extra description</p>
						<Button href="/">Button</Button>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>
	<div class="absolute -mt-20 text-sm font-semibold text-white md:px-20">
		Item {current} of {count}
	</div>
</div>

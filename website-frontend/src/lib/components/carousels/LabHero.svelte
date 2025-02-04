<script lang="ts">
	import { deslugify } from '$lib/utils';
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Image } from 'lucide-svelte';

	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel/index';
	import type { CarouselAPI } from '$lib/@shadcn-svelte/ui/carousel/context';
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import Autoplay from 'embla-carousel-autoplay';
	import Fade from 'embla-carousel-fade';

	export let background_images: string[] = [];
	export let logo_image: string = '';
	export let link: string = '';
	export let title: string;

	const autoplayPlugin = Autoplay({ delay: 8000, stopOnInteraction: true });
	const fadePlugin = Fade();

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

	$: if (background_images.length === 0) {
		background_images = [
			`default1.jpg`,
			`default2.jpg`,
			`default3.jpg`,
			`default4.jpg`,
		];
	}

	$: deslugify_title = deslugify(title);
</script>

<div>
	<div class="relative">
		<Carousel.Root
			bind:api
			plugins={[autoplayPlugin, fadePlugin]}
			class="h-[82vh] w-full md:h-[80vh]"
		>
			<Carousel.Content>
				{#each background_images as background_image}
					<Carousel.Item class="h-full">
						<div
							class="h-[82vh] bg-cover bg-center md:h-[80vh]"
							style="background-image: linear-gradient(to top, hsl(var(--primary)), transparent), url('{PUBLIC_APIURL}/assets/{background_image}')"
						></div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	</div>

	<div
		class="absolute bottom-40 flex w-full flex-col items-center text-secondary-foreground md:bottom-28 md:flex-row md:pl-5 md:pr-2 lg:px-16 lg:bottom-32"
	>
		<div
			class="mx-auto flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full border-4 border-gray-200 bg-gray-100 md:h-40 md:w-40 md:mr-10 lg:mr-20"
		>
			{#if logo_image}
				<img
					class="h-full w-full rounded-full object-cover"
					src="{PUBLIC_APIURL}/assets/{logo_image}"
					alt="Logo"
				/>
			{:else}
				<Image class="text-secondary h-10 w-10" />
			{/if}
		</div>

		<div class="mt-4 w-full md:mt-0">
			<div class="flex w-full justify-center md:justify-start">
				<h1 class="max-w-2xl text-center text-4xl font-bold md:leading-[3.2rem] md:text-start md:text-5xl">
					{deslugify_title}
				</h1>
			</div>

			<div
				class="flex flex-col items-center justify-center text-center md:flex-row md:justify-between"
			>
				<div class="my-5 flex gap-2 md:mb-0 md:mt-5">
					{#each Array(count) as _, index}
						<button
							class="h-2 w-2 rounded-full transition-all duration-400
							{index === current - 1 ? 'bg-primary-foreground' 
							: 'bg-gray-400'}"
							on:click={() => api.scrollTo(index)}
						></button>
					{/each}
				</div>

				{#if link}
					<Button 
						href="{link}" 
						target="_blank" 
						rel="noopener noreferrer" 
						class="max-w-xs rounded-full bg-background/20 hover:bg-background/30"
					>
						Visit Our Site
					</Button>
				{/if}
			</div>
		</div>
	</div>
</div>
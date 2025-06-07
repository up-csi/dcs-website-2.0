<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Image } from 'lucide-svelte';

	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel/index';
	import type { CarouselAPI } from '$lib/@shadcn-svelte/ui/carousel/context';
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import Autoplay from 'embla-carousel-autoplay';
	import Fade from 'embla-carousel-fade';
	import Breadcrumb from '../breadcrumbs/BannerBreadcrumb.svelte';

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
		background_images = [`default1.jpg`, `default2.jpg`, `default3.jpg`, `default4.jpg`];
	}

	let carousel_height: number;
	let logo_height: number;
	$: logo_width = logo_height;
</script>

<div>
	<div class="relative" bind:clientHeight={carousel_height}>
		<Carousel.Root
			bind:api
			plugins={[autoplayPlugin, fadePlugin]}
			class="h-[82vh] w-full md:h-[80vh]"
		>
			<Carousel.Content>
				{#each background_images as background_image}
					<Carousel.Item class="h-full">
						{#if carousel_height}
							<div
								class="h-[82vh] bg-cover bg-center md:h-[80vh]"
								style="background-image: linear-gradient(to top, hsl(var(--background-dark)), transparent), url('{PUBLIC_APIURL}/assets/{background_image}?height={carousel_height}')"
							></div>
						{/if}
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	</div>

	<div class="absolute bottom-16 w-full text-secondary-foreground lg:bottom-10 lg:px-16">
		<div class="mb-8 px-16 lg:px-0">
			<Breadcrumb page_name={title} />
		</div>

		<div class="flex flex-col items-center lg:flex-row">
			<div
				class="mx-auto flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full border-4 border-gray-200 bg-gray-100 md:h-32 md:w-32 lg:mr-20 lg:h-40 lg:w-40"
				bind:clientHeight={logo_height}
			>
				{#if logo_image && logo_height}
					<img
						class="h-full w-full rounded-full object-cover"
						src="{PUBLIC_APIURL}/assets/{logo_image}?fit=cover&width={logo_width}&height={logo_height}"
						alt="Logo"
					/>
				{:else}
					<Image class="h-10 w-10 text-secondary" />
				{/if}
			</div>

			<div class="mt-4 w-full md:mt-6 lg:mt-0">
				<div class="flex w-full justify-center lg:justify-start">
					<h1
						class="max-w-2xl text-center text-4xl font-bold lg:text-start lg:text-5xl lg:leading-[3.2rem]"
					>
						{title}
					</h1>
				</div>

				<div
					class="flex flex-col items-center justify-center text-center lg:flex-row lg:justify-between"
				>
					<div class="my-5 flex gap-2 lg:mb-0 lg:mt-5">
						{#each Array(count).keys() as index}
							<button
								class="duration-400 h-2 w-2 rounded-full transition-all
								{index === current - 1 ? 'bg-primary-foreground' : 'bg-gray-400'}"
								on:click={() => api.scrollTo(index)}
							></button>
						{/each}
					</div>

					{#if link}
						<Button
							href={link}
							target="_blank"
							rel="noopener noreferrer"
							class="mt-5 max-w-xs rounded-full bg-background/20 hover:bg-background/30"
						>
							Visit Our Site
						</Button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

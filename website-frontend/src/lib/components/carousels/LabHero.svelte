<script lang="ts">
	import { deslugify } from '$lib/utils';
	import { PUBLIC_APIURL } from '$env/static/public';

	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel/index';
	import type { CarouselAPI } from '$lib/@shadcn-svelte/ui/carousel/context';
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import Autoplay from 'embla-carousel-autoplay';
	import Fade from 'embla-carousel-fade';

	export let title: string;
	export let background_image: string;

	$: deslugify_title = deslugify(title);

	const autoplayPlugin = Autoplay({ delay: 8000, stopOnInteraction: true });
	const fadePlugin = Fade({ duration: 3000 });

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

	const lab_logo = 'x';
</script>

<div>
	<div class="relative">
		<Carousel.Root
			bind:api
			plugins={[autoplayPlugin, fadePlugin]}
			class="h-[82vh] w-full md:h-[75vh]"
		>
			<Carousel.Content>
				{#each Array(6) as _}
					<Carousel.Item class="relative h-full">
						<div
							class="h-[82vh] bg-cover bg-center md:h-[75vh]"
							style="background-image: linear-gradient(to top, hsl(var(--primary)), transparent), url('{PUBLIC_APIURL}/assets/{background_image}')"
						></div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	</div>

	<div
		class="absolute bottom-36 flex w-full flex-col items-center text-secondary-foreground md:flex-row md:pl-5 md:pr-2 lg:px-16"
	>
		<div
			class="mx-auto flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full border-4 border-gray-200 bg-gray-100 md:mr-20 md:h-40 md:w-40"
		>
			{#if lab_logo}
				<img
					class="h-full w-full rounded-full object-cover"
					src="{PUBLIC_APIURL}/assets/{lab_logo}"
					alt="Logo"
				/>
			{:else}
				<h1 class="text-center text-2xl font-medium text-[#004420a2]">`⎚⩊⎚´</h1>
			{/if}
		</div>

		<div class="mt-4 w-full md:mt-0">
			<div class="flex w-full justify-center md:justify-start">
				<h1 class="max-w-lg text-center text-4xl font-bold md:text-start md:text-5xl">
					{deslugify_title}
				</h1>
			</div>

			<div
				class="flex flex-col items-center justify-center text-center md:flex-row md:justify-between"
			>
				<div class="my-5 flex gap-2 md:mb-0 md:mt-5">
					{#each Array(count) as _, index}
						<button
							class="h-2 w-2 rounded-full transition-colors duration-300"
							class:bg-primary-foreground={index === current - 1}
							class:bg-gray-400={index !== current - 1}
							on:click={() => api.scrollTo(index)}
						></button>
					{/each}
				</div>

				<Button href="/" class="max-w-xs rounded-full bg-background/20">Visit Our Site</Button>
			</div>
		</div>
	</div>
</div>

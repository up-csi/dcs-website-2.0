<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel/index';
	import type { CarouselAPI } from '$lib/@shadcn-svelte/ui/carousel/context';
	import Autoplay from 'embla-carousel-autoplay';
	import Fade from 'embla-carousel-fade';
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const delay = 6000;
	const plugin = Autoplay({ delay, stopOnInteraction: true });

	export let news;
	let api: CarouselAPI;
	let current = 0;
	let count = 0;
	let autoplayRunning = true;
	let startTime = Date.now();
	let elapsed = 0;
	
	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;

		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	}

	$: if (current) {
		startTime = Date.now();
		elapsed = 0;
	}

	function stopAutoplay() {
		plugin.stop();
		autoplayRunning = false;
	}

	function resetAutoplay() {
		plugin.reset();
		autoplayRunning = true;
	}

	function updateTime() {
		if (autoplayRunning) {
			elapsed = Date.now() - startTime;
			requestAnimationFrame(updateTime);
		}
	}

	function goToSlide(index: number) {
		api.scrollTo(index);
		progress = 1;
	}

	updateTime();
	$: progress = Math.round((elapsed / delay) * 100);
</script>

<div>
	<Carousel.Root
		bind:api
		plugins={[plugin, Fade()]}
	>
		<Carousel.Content>
			{#each news as news_item, index}
				<Carousel.Item class="relative flex h-[60vh] md:h-[90vh] flex-col items-center justify-end">
					{#if news_item.background_image}
						<img
							src="{PUBLIC_APIURL}/assets/{news_item.background_image}"
							alt="Carousel Item"
							class="absolute h-full w-full object-cover"
						/>
					{/if}
					<div
						class="absolute flex h-full w-full flex-col justify-end bg-gradient-to-t from-[#0000009e] to-transparent"
					>
						<div
							class="container max-w-3xl mx-auto flex flex-col items-center gap-y-5 pb-9 md:pb-14 pt-72 text-center text-secondary-foreground md:items-start md:text-left md:mx-12"
							on:mouseenter={stopAutoplay}
							on:mouseleave={resetAutoplay}
						>
							{#if index + 1 === current}
								<div 
									in:fly={{ x: 40, duration: 1000, easing: cubicOut }} 
									out:fly={{ x: -40, duration: 1000, easing: cubicOut }}
								>
									<h1 class="text-2xl leading-tight md:leading-tight font-bold md:text-4xl drop-shadow-lg">{news_item.title}</h1>
					   			</div>					   

								<div 
									class="hidden md:block"
								   	in:fly={{ x: 40, duration: 900, easing: cubicOut }} 
									out:fly={{ x: -40, duration: 900 }}
							   	>
									<p class="text-xs font-medium md:text-base drop-shadow-lg line-clamp-3">{news_item.summary}</p>
								</div>

								<div 
									class="block md:hidden"
								   	in:fly={{ x: 40, duration: 700, easing: cubicOut }} 
									out:fly={{ x: -40, duration: 700 }}
							   	>
								   <p class="text-xs md:text-sm text-white font-medium opacity-70 drop-shadow-lg">
										by {news_item.user_created.first_name} {news_item.user_created.last_name}
									</p>
								</div>

								<div
									class="flex items-center space-x-6" 
								   	in:fly={{ x: 40, duration: 500, easing: cubicOut }} 
									out:fly={{ x: -40, duration: 500 }}
							   	>
									<Button class="w-fit rounded-full px-5" href="/news/{news_item.slug}">
										Read Story
									</Button>
									<p class="hidden md:block text-xs md:text-sm text-white font-medium opacity-70 drop-shadow-lg">
										by {news_item.user_created.first_name} {news_item.user_created.last_name}
									</p>
								</div>
							{/if}

							<!-- Pagination -->
							<div class="flex gap-x-3 text-sm font-semibold text-secondary-foreground md:ml-[6px] md:mt-4">
								{#each [...Array(count).keys()] as i}
									{#if i + 1 === current}
										<div class="overflow-hidden relative h-2 w-8 rounded-full bg-white/40">
											<div 
												class="rounded-full absolute top-0 left-0 h-full bg-white transition-[width] duration-300 ease-linear"
												style="width: {progress}%;"
											></div>
										</div>
									{:else}
										<button
											class="h-2 w-2 rounded-full bg-white/40"
											on:click={() => goToSlide(i)}
										></button>
									{/if}
								{/each}
							</div>
						</div>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>
</div>

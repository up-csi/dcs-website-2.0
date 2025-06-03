<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel/index';
	import type { CarouselAPI } from '$lib/@shadcn-svelte/ui/carousel/context';
	import Autoplay from 'embla-carousel-autoplay';
	import Fade from 'embla-carousel-fade';
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	const delay = 6000;
	const plugin = Autoplay({ delay, stopOnInteraction: true });

	export let news;
	let api: CarouselAPI;
	let current = 0;
	let count = 0;
	let autoplayRunning = true;
	let startTime = Date.now();
	let elapsed = 0;
	let progress = 0;

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
			progress = Math.round((elapsed / delay) * 100);
			requestAnimationFrame(updateTime);
		}
	}

	function goToSlide(index: number) {
		api.scrollTo(index);
		progress = 1;
	}

	onMount(() => {
		updateTime();
	});
</script>

<div>
	<Carousel.Root bind:api plugins={[plugin, Fade()]}>
		<Carousel.Content>
			{#each news as news_item, index}
				<Carousel.Item class="relative flex h-[70vh] flex-col items-center justify-end md:h-[90vh]">
					{#if news_item.background_image}
						<img
							src="{PUBLIC_APIURL}/assets/{news_item.background_image}?height=1080"
							alt="Carousel Item"
							class="absolute h-full w-screen object-cover"
						/>
					{/if}
					<div
						class="absolute flex h-full w-screen flex-col justify-end bg-gradient-to-t from-[#0000009e] to-transparent"
					>
						<div
							role="button"
							tabindex="0"
							class="container mx-auto flex max-w-3xl flex-col items-center gap-y-5 pb-9 pt-72 text-center text-secondary-foreground md:mx-12 md:items-start md:pb-14 md:text-left"
							on:mouseenter={stopAutoplay}
							on:mouseleave={resetAutoplay}
						>
							{#if index + 1 === current}
								<div
									in:fly={{ x: 40, duration: 1000, easing: cubicOut }}
									out:fly={{ x: -40, duration: 1000, easing: cubicOut }}
								>
									<h1
										class="text-2xl font-bold leading-tight drop-shadow-lg md:text-4xl md:leading-tight"
									>
										{news_item.title}
									</h1>
								</div>

								<div
									class="hidden md:block"
									in:fly={{ x: 40, duration: 900, easing: cubicOut }}
									out:fly={{ x: -40, duration: 900 }}
								>
									<p class="line-clamp-3 text-xs font-medium drop-shadow-lg md:text-base">
										{news_item.summary}
									</p>
								</div>

								<div
									class="block md:hidden"
									in:fly={{ x: 40, duration: 700, easing: cubicOut }}
									out:fly={{ x: -40, duration: 700 }}
								>
									<p class="text-xs font-medium text-white opacity-70 drop-shadow-lg md:text-sm">
										by {news_item.user_created.first_name}
										{news_item.user_created.last_name}
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
									<p
										class="hidden text-xs font-medium text-white opacity-70 drop-shadow-lg md:block md:text-sm"
									>
										by {news_item.user_created.first_name}
										{news_item.user_created.last_name}
									</p>
								</div>
							{/if}

							<!-- Pagination -->
							<div
								class="flex gap-x-3 text-sm font-semibold text-secondary-foreground md:ml-[6px] md:mt-4"
							>
								{#if count !== 1}
									{#each [...Array(count).keys()] as i}
										{#if i + 1 === current}
											<div class="relative h-2 w-8 overflow-hidden rounded-full bg-white/40">
												<div
													class="absolute left-0 top-0 h-full rounded-full bg-white transition-[width] duration-300 ease-linear"
													style="width: {progress}%;"
												></div>
											</div>
										{:else}
											<button class="h-2 w-2 rounded-full bg-white/40" on:click={() => goToSlide(i)}
											></button>
										{/if}
									{/each}
								{/if}
							</div>
						</div>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>
</div>

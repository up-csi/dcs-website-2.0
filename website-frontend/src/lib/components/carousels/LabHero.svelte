<script lang="ts">
    import { PUBLIC_APIURL } from '$env/static/public';
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel/index';
	import type { CarouselAPI } from '$lib/@shadcn-svelte/ui/carousel/context';
    import { Button } from '$lib/@shadcn-svelte/ui/button';
	import Autoplay from 'embla-carousel-autoplay';

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

    const lab_logo = "x"
</script>

<div>
    <div class="relative">
    	<Carousel.Root
    		bind:api
    		plugins={[plugin]}
    		class="h-[82vh] md:h-[75vh] w-full"
    		on:mousenter={plugin.stop}
    		on:mouseleave={plugin.reset}
    	>
    		<Carousel.Content>
    			{#each Array(6) as _}
    				<Carousel.Item class="relative h-full">
    					<img
    						src="source/to/image"
    						alt="Carousel Item"
    						class="relative h-[82vh] md:h-[75vh] w-full bg-secondary"
    					/>
    				</Carousel.Item>
    			{/each}
    		</Carousel.Content>
    	</Carousel.Root>
    </div>

    <div class="w-full absolute bottom-40 text-secondary-foreground flex items-center flex-col md:flex-row md:px-16">

        <div
            class="mx-auto flex flex-shrink-0 h-28 w-28 items-center justify-center rounded-full border-4 border-gray-200 bg-gray-100 md:mr-20 md:h-40 md:w-40"
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

        <div class="w-full mt-4 md:mt-0">
            <h1 class="font-bold max-w-lg text-4xl text-center md:text-5xl md:text-start">UP Center for Student Innovations</h1>
            <div class="flex text-center flex-col justify-center items-center md:flex-row md:justify-between">
                <div class="mt-3 mb-8 md:mt-5 md:mb-0 text-sm font-semibold">
                    Item {current} of {count}
                </div>
                <Button href="/" class="rounded-full max-w-xs">Visit Our Site</Button>
            </div>
        </div>
    </div>
    
</div>

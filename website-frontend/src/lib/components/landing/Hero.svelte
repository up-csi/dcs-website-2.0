<script lang="ts">
	import * as Carousel from "$lib/components/ui/carousel/index.js";
  	import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
	import Autoplay from "embla-carousel-autoplay";
    import { Button } from "$lib/components/ui/button";
 
  	const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });
	
  	let api: CarouselAPI;
  	let current = 0;
  	let count = 0;
	
  	$: if (api) {
  	  count = api.scrollSnapList().length;
  	  current = api.selectedScrollSnap() + 1;
	
  	  api.on("select", () => {
  	    current = api.selectedScrollSnap() + 1;
  	  });
  	}
</script>

<div>
	<Carousel.Root
		bind:api
		plugins={[plugin]}
		class="w-full h-[90vh] relative"
		on:mousenter={plugin.stop}
		on:mouseleave={plugin.reset}
  	>
		<Carousel.Content>
		  {#each Array(6) as _, i (i)}
			<Carousel.Item class="relative h-full">
				<img
					src="source/to/image"
					alt="Carousel Item"
					class="w-full h-[90vh] bg-slate-400 relative"
				/>
			  	<div class="absolute bottom-28 md:px-20 text-white">
					<h1 class="text-4xl font-bold mb-5">Some Big Bold Description Text</h1>
					<p class="text-md font-semibold mb-5">Some extra description</p>
                    <Button href="/">Button</Button>
			  	</div>
			</Carousel.Item>
		  {/each}
		</Carousel.Content>
  	</Carousel.Root>
	<div class="text-white font-semibold absolute -mt-20 text-sm md:px-20">
		Item {current} of {count}
	</div>
</div>
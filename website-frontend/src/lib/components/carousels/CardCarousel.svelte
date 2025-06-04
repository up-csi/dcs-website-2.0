<script lang="ts">
	import * as Carousel from '$lib/@shadcn-svelte/ui/carousel/index';
	export let CardComponent;
	export let items;
</script>

<Carousel.Root opts={{ align: 'start', dragFree: true }}>
	<Carousel.Content class="-ml-[85%] -mr-[81%] pb-8 md:-ml-[18%] md:-mr-[17%]">
		<Carousel.Item class="basis-1/3 md:basis-1/6">
			<div class="h-full" />
		</Carousel.Item>
		{#each items as item}
			<Carousel.Item class="basis-1/3 md:basis-1/6">
				<svelte:component this={CardComponent} {item} />
			</Carousel.Item>
		{/each}
		<Carousel.Item class="basis-1/3 md:basis-1/6">
			<div class="h-full" />
		</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous
		class="absolute -left-3 h-12 w-12 rounded-lg pl-2 text-primary-dark shadow-md disabled:opacity-0 md:h-16 md:w-20 md:pl-5"
	/>
	<Carousel.Next
		class="absolute -right-3 h-12 w-12 rounded-lg pr-2 text-primary-dark shadow-md disabled:opacity-0 md:h-16 md:w-20 md:pr-5"
	/>
</Carousel.Root>

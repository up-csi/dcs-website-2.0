<script lang="ts">
    import * as Carousel from '$lib/@shadcn-svelte/ui/carousel/index';
    import { NewsItem } from '$lib/models/news';
    import { Event } from '$lib/models/event';
    export let CardComponent;
    export let items: NewsItem[] | Event[] = [];
</script>

<Carousel.Root opts={{ align: 'start', dragFree: true }} class="w-screen -ml-[50vw] left-1/2 relative">
    <Carousel.Content class="-ml-[90%] -mr-[80%] md:-ml-[18%] md:-mr-[17%]">
        <Carousel.Item class="basis-1/3 md:basis-1/6">
            <div class="h-full"/>
        </Carousel.Item>
        {#each items as item}
            <Carousel.Item class="basis-1/3 md:basis-1/6">
                <svelte:component this={CardComponent} {item} />
            </Carousel.Item>
        {/each}
        <Carousel.Item class="basis-1/3 md:basis-1/6">
            <div class="h-full"/>
        </Carousel.Item>
    </Carousel.Content>
    <Carousel.Previous class="disabled:opacity-0 shadow-sm absolute -left-3 rounded-lg pl-2 h-12 w-12 md:h-16 md:w-20 md:pl-5" />
    <Carousel.Next class="disabled:opacity-0 shadow-sm absolute -right-3 rounded-lg pr-2 h-12 w-12 md:h-16 md:w-20 md:pr-5"/>
</Carousel.Root>
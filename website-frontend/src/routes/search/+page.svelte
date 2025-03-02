<script lang="ts">
	/** @type {import('./$types').PageData} */

    import * as Tabs from '$lib/@shadcn-svelte/ui/tabs';
    import SearchResult from '$lib/components/search/SearchResult.svelte';
    import { ScrollArea } from "$lib/@shadcn-svelte/ui/scroll-area/index.js";

    export let data;
    $:({ events, people, laboratories, publications } = data)

    const tabs = [
        {
            tab: 'All',
            content: ['events', 'people', 'laboratories', 'publications'],
            res: 0
        },
        {
            tab: 'Events',
            content: ['events'],
            res: 0
        },
        {
            tab: 'People',
            content: ['people'],
            res: 0
        },
        {
            tab: 'Laboratories',
            content: ['laboratories'],
            res: 0
        },
        {
            tab: 'Publications',
            content: ['publications'],
            res: 0
        }
    ];

</script>

<div class="container">
    <Tabs.Root value="All">
        <ScrollArea orientation="horizontal">
            <Tabs.List class="bg-background w-full flex justify-center items-center mt-20">
                {#each tabs as { tab, res, ...rest }}
                    <Tabs.Trigger value={tab} class="data-[state=active]:shadow-none lg:data-[state=active]:border-b-2 rounded-none focus:ring-none">{tab} ({res})</Tabs.Trigger>
                {/each}
            </Tabs.List>
        </ScrollArea>

        {#each tabs as { tab, content, res }}
            <Tabs.Content value={tab}>
                <p class="font-bold text-3xl">{res} Search results</p>

                {#if content.includes('events', 0)}
                    {#each events as { event_headline, event_content, hero_image, ...rest }}
                        <SearchResult image={hero_image} name={event_headline}>
                            <p class="font-bold text-xl">{event_headline}</p>
                            <p class="line-clamp-2">{@html event_content}</p>
                        </SearchResult>
                    {/each}
                {/if}

                {#if content.includes('people', 0)}
                    {#each people as { first_name, last_name, profile_image, position, ...rest }}
                        <SearchResult image={profile_image} name="{first_name} {last_name}">
                            <p class="font-bold text-xl">{first_name} {last_name}</p>
                            <p>{position}</p>
                        </SearchResult>
                    {/each}
                {/if}

                {#if content.includes('laboratories', 0)}
                    {#each laboratories as { name, description, logo, ...rest }}
                        <SearchResult image={logo} {name}>
                            <p class="font-bold text-xl">{name}</p>
                            <p class="line-clamp-2">{description}</p>
                        </SearchResult>
                    {/each}
                {/if}

                {#if content.includes('publications', 0)}
                    {#each publications as { title, authors, hero_image, laboratory, abstract, ...rest }}
                        <SearchResult image={hero_image} name={title}>
                            <p class="font-bold text-xl">{title}</p>
                            <p class="line-clamp-2">{abstract}</p>
                        </SearchResult>
                    {/each}
                {/if}
            </Tabs.Content>
        {/each}
    </Tabs.Root>
</div>
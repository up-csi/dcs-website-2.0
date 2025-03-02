<script lang="ts">
	/** @type {import('./$types').PageData} */

	import * as Tabs from '$lib/@shadcn-svelte/ui/tabs';
	import { Search } from 'lucide-svelte';
	import SearchResult from '$lib/components/search/SearchResult.svelte';
	import { ScrollArea } from '$lib/@shadcn-svelte/ui/scroll-area/index.js';

	export let search_value = 'clarisse';

	export let data;
	$: ({ events, people, laboratories, publications } = data);

	const tabs = [
		{
			tab: 'All',
			content: ['events', 'people', 'laboratories', 'publications'],
			res: 1
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
			<Tabs.List class="mt-20 flex w-full items-center justify-center bg-background">
				{#each tabs as { tab, res }}
					<Tabs.Trigger
						value={tab}
						class="focus:ring-none rounded-none data-[state=active]:shadow-none lg:data-[state=active]:border-b-2"
						>{tab} ({res})</Tabs.Trigger
					>
				{/each}
			</Tabs.List>
		</ScrollArea>

		{#each tabs as { tab, content, res }}
			<Tabs.Content value={tab}>
				<p class="text-3xl font-bold">
					{res} Search result{#if res !== 1}s{/if}
				</p>

				{#if res > 0}
					{#if content.includes('events', 0)}
						{#each events as { event_headline, event_content, hero_image }}
							<SearchResult image={hero_image} name={event_headline}>
								<p class="text-xl font-bold">{event_headline}</p>
								<p class="line-clamp-2">{@html event_content}</p>
							</SearchResult>
						{/each}
					{/if}

					{#if content.includes('people', 0)}
						{#each people as { first_name, last_name, profile_image, position }}
							<SearchResult image={profile_image} name="{first_name} {last_name}">
								<p class="text-xl font-bold">{first_name} {last_name}</p>
								<p>{position}</p>
							</SearchResult>
						{/each}
					{/if}

					{#if content.includes('laboratories', 0)}
						{#each laboratories as { name, description, logo }}
							<SearchResult image={logo} {name}>
								<p class="text-xl font-bold">{name}</p>
								<p class="line-clamp-2">{description}</p>
							</SearchResult>
						{/each}
					{/if}

					{#if content.includes('publications', 0)}
						{#each publications as { title, authors, hero_image, laboratory, abstract }}
							<SearchResult image={hero_image} name={title}>
								<p class="text-xl font-bold">{title}</p>
								<p class="line-clamp-2">{abstract}</p>
							</SearchResult>
						{/each}
					{/if}
				{:else}
					<div class="relative h-[50vh]">
						<div class="absolute left-0 top-0 flex h-full w-full items-center justify-center">
							<Search class="h-[30vh] w-[30vh] text-secondary/25" />
						</div>
						<div class="absolute left-0 top-0 flex h-full w-full items-center justify-center">
							<p>No search results for <b>{search_value}</b></p>
						</div>
					</div>
				{/if}
			</Tabs.Content>
		{/each}
	</Tabs.Root>
</div>

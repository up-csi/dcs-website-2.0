<script lang="ts">
	/** @type {import('./$types').PageData} */

	import * as Tabs from '$lib/@shadcn-svelte/ui/tabs';
	import { Search } from 'lucide-svelte';
	import SearchResult from '$lib/components/search/SearchResult.svelte';
	import { ScrollArea } from '$lib/@shadcn-svelte/ui/scroll-area/index.js';
	import { page } from '$app/stores';

	export let data;
	let tabs;

	$: ({ news, events, people, laboratories, publications } = data);

	$: tabs = [
		{
			tab: 'All',
			res: news.length + events.length + people.length + laboratories.length + publications.length
		},
		{
			tab: 'News',
			res: news.length
		},
		{
			tab: 'Events',
			res: events.length
		},
		{
			tab: 'People',
			res: people.length
		},
		{
			tab: 'Laboratories',
			res: laboratories.length
		},
		{
			tab: 'Publications',
			res: publications.length
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

		{#each tabs as { tab, res }}
			<Tabs.Content value={tab}>
				<p class="text-3xl font-bold">
					{res} Search result{#if res !== 1}s
					{/if}
					{#if tab !== 'All'}
						<span>in {tab}</span>
					{/if}
				</p>

				{#if res > 0}
					{#if tab === 'All'}
						{#each news as { slug, title, summary, background_image }}
							<SearchResult href="/news/{slug}" image={background_image} name={title}>
								<p class="text-xl font-bold">{title}</p>
								<p class="line-clamp-2">{@html summary}</p>
							</SearchResult>
						{/each}
						{#each events as { slug, event_headline, event_content, hero_image }}
							<SearchResult href="/events/{slug}" image={hero_image} name={event_headline}>
								<p class="text-xl font-bold">{event_headline}</p>
								<p class="line-clamp-2">{@html event_content}</p>
							</SearchResult>
						{/each}
						{#each people as { category, username, first_name, last_name, profile_image, position }}
							<SearchResult
								href="/people/{category}/{username}"
								image={profile_image}
								name="{first_name} {last_name}"
							>
								<p class="text-xl font-bold">{first_name} {last_name}</p>
								<p>{position}</p>
							</SearchResult>
						{/each}
						{#each laboratories as { slug, name, description, logo }}
							<SearchResult href="/laboratories/{slug}" image={logo} {name}>
								<p class="text-xl font-bold">{name}</p>
								<p class="line-clamp-2">{description}</p>
							</SearchResult>
						{/each}
						{#each publications as publication}
							<SearchResult
								{publication}
								href="/publications"
								image={publication.hero_image}
								name={publication.title}
							>
								<p class="text-xl font-bold">{publication.title}</p>
								<p>
									{#each publication.authors.slice(0, -1) as { last_name }}
										{last_name},
									{/each}
									{publication.authors.at(-1)?.last_name}
								</p>
								<p class="line-clamp-2">{publication.abstract}</p>
							</SearchResult>
						{/each}
					{:else if tab === 'News'}
						{#each news as { slug, title, summary, background_image }}
							<SearchResult href="/news/{slug}" image={background_image} name={title}>
								<p class="text-xl font-bold">{title}</p>
								<p class="line-clamp-2">{@html summary}</p>
							</SearchResult>
						{/each}
					{:else if tab === 'Events'}
						{#each events as { slug, event_headline, event_content, hero_image }}
							<SearchResult href="/events/{slug}" image={hero_image} name={event_headline}>
								<p class="text-xl font-bold">{event_headline}</p>
								<p class="line-clamp-2">{@html event_content}</p>
							</SearchResult>
						{/each}
					{:else if tab === 'People'}
						{#each people as { category, username, first_name, last_name, profile_image, position }}
							<SearchResult
								href="/people/{category}/{username}"
								image={profile_image}
								name="{first_name} {last_name}"
							>
								<p class="text-xl font-bold">{first_name} {last_name}</p>
								<p>{position}</p>
							</SearchResult>
						{/each}
					{:else if tab === 'Laboratories'}
						{#each laboratories as { slug, name, description, logo }}
							<SearchResult href="/laboratories/{slug}" image={logo} {name}>
								<p class="text-xl font-bold">{name}</p>
								<p class="line-clamp-2">{description}</p>
							</SearchResult>
						{/each}
					{:else if tab === 'Publications'}
						{#each publications as publication}
							<SearchResult
								{publication}
								href="/publications"
								image={publication.hero_image}
								name={publication.title}
							>
								<p class="text-xl font-bold">{publication.title}</p>
								<p>
									{#each publication.authors.slice(0, -1) as { last_name }}
										{last_name},
									{/each}
									{publication.authors.at(-1)?.last_name}
								</p>
								<p class="line-clamp-2">{publication.abstract}</p>
							</SearchResult>
						{/each}
					{/if}
				{:else}
					<div class="relative h-[50vh]">
						<div class="absolute left-0 top-0 flex h-full w-full items-center justify-center">
							<Search class="h-[30vh] w-[30vh] text-secondary/25" />
						</div>
						<div class="absolute left-0 top-0 flex h-full w-full items-center justify-center">
							<p>
								{#if $page.url.searchParams.get('q')}
									No search results for <b>{$page.url.searchParams.get('q')}</b>
									{#if tab !== 'All'}
										<span>in {tab}</span>
									{/if}
								{:else}
									Please provide a search input
								{/if}
							</p>
						</div>
					</div>
				{/if}
			</Tabs.Content>
		{/each}
	</Tabs.Root>
</div>

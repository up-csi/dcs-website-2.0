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
				{#if res > 0}
					<div class="py-5">
						<p class="text-3xl font-bold">
							{res} Search result{#if res !== 1}s{/if} for
							<span class="font-normal">{$page.url.searchParams.get('q')}</span>
							{#if tab !== 'All'}
								<span>in {tab}</span>
							{/if}
						</p>
					</div>

					{#if tab === 'All'}
						{#each news as { slug, title, summary, background_image }}
							<SearchResult href="/news/{slug}" image={background_image} name={title}>
								<p class="text-xl font-bold">{title}</p>
								{#if summary}
									<p class="line-clamp-2">{@html summary}</p>
								{/if}
							</SearchResult>
						{/each}
						{#each events as { slug, event_headline, event_content, hero_image }}
							<SearchResult href="/events/{slug}" image={hero_image} name={event_headline}>
								<p class="text-xl font-bold">{event_headline}</p>
								{#if event_content}
									<p class="line-clamp-2">{@html event_content}</p>
								{/if}
							</SearchResult>
						{/each}
						{#each people as { username, first_name, last_name, profile_image, position }}
							<SearchResult
								href="/people/{username}"
								image={profile_image}
								name="{first_name} {last_name}"
							>
								<p class="text-xl font-bold">{first_name} {last_name}</p>
								{#if position}
									<p>{position}</p>
								{/if}
							</SearchResult>
						{/each}
						{#each laboratories as { slug, name, description, logo }}
							<SearchResult href="/labs/{slug}" image={logo} {name}>
								<p class="text-xl font-bold">{name}</p>
								{#if description}
									<p class="line-clamp-2">{description}</p>
								{/if}
							</SearchResult>
						{/each}
						{#each publications as publication}
							<SearchResult
								{publication}
								href="/research/publications"
								image={publication.hero_image}
								name={publication.title}
							>
								<p class="text-xl font-bold">{publication.title}</p>
								{#if publication.authors.length > 0}
									<p>
										{#each publication.authors as { last_name }, i}
											{last_name}{#if i + 1 !== publication.authors.length}{`, `}{/if}
										{/each}
									</p>
								{/if}
								{#if publication.abstract}
									<p class="line-clamp-2">{publication.abstract}</p>
								{/if}
							</SearchResult>
						{/each}
					{:else if tab === 'News'}
						{#each news as { slug, title, summary, background_image }}
							<SearchResult href="/news/{slug}" image={background_image} name={title}>
								<p class="text-xl font-bold">{title}</p>
								{#if summary}
									<p class="line-clamp-2">{@html summary}</p>
								{/if}
							</SearchResult>
						{/each}
					{:else if tab === 'Events'}
						{#each events as { slug, event_headline, event_content, hero_image }}
							<SearchResult href="/events/{slug}" image={hero_image} name={event_headline}>
								<p class="text-xl font-bold">{event_headline}</p>
								{#if event_content}
									<p class="line-clamp-2">{@html event_content}</p>
								{/if}
							</SearchResult>
						{/each}
					{:else if tab === 'People'}
						{#each people as { username, first_name, last_name, profile_image, position }}
							<SearchResult
								href="/people/{username}"
								image={profile_image}
								name="{first_name} {last_name}"
							>
								<p class="text-xl font-bold">{first_name} {last_name}</p>
								{#if position}
									<p>{position}</p>
								{/if}
							</SearchResult>
						{/each}
					{:else if tab === 'Laboratories'}
						{#each laboratories as { slug, name, description, logo }}
							<SearchResult href="/labs/{slug}" image={logo} {name}>
								<p class="text-xl font-bold">{name}</p>
								{#if description}
									<p class="line-clamp-2">{description}</p>
								{/if}
							</SearchResult>
						{/each}
					{:else if tab === 'Publications'}
						{#each publications as publication}
							<SearchResult
								{publication}
								href="/research/publications"
								image={publication.hero_image}
								name={publication.title}
							>
								<p class="text-xl font-bold">{publication.title}</p>
								{#if publication.authors.length > 0}
									<p>
										{#each publication.authors as { last_name }, i}
											{last_name}{#if i + 1 !== publication.authors.length}{`, `}{/if}
										{/each}
									</p>
								{/if}
								{#if publication.abstract}
									<p class="line-clamp-2">{publication.abstract}</p>
								{/if}
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

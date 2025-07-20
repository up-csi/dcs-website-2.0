<script lang="ts">
	/** @type {import('./$types').PageData} */

	import * as Tabs from '$lib/@shadcn-svelte/ui/tabs';
	import { Search } from 'lucide-svelte';
	import { page } from '$app/stores';
	import Await from '$lib/components/loading/Await.svelte';
	import { goto } from '$app/navigation';
	import NewsSearchResult from '$lib/components/search/NewsSearchResult.svelte';
	import EventsSearchResult from '$lib/components/search/EventsSearchResult.svelte';
	import PeopleSearchResult from '$lib/components/search/PeopleSearchResult.svelte';
	import LaboratoriesSearchResult from '$lib/components/search/LaboratoriesSearchResult.svelte';
	import PublicationsSearchResult from '$lib/components/search/PublicationsSearchResult.svelte';

	export let data;
	const layout = 'lg:w-3/4';

	$: ({
		news_count,
		events_count,
		people_count,
		laboratories_count,
		publications_count,
		news,
		events,
		people,
		laboratories,
		publications
	} = data);

	$: query = new URLSearchParams($page.url.searchParams.toString());
	$: value =
		query.get('tab') ??
		(news_count > 0
			? 'News'
			: events_count > 0
				? 'Events'
				: people_count > 0
					? 'People'
					: laboratories_count > 0
						? 'Laboratories'
						: publications_count > 0
							? 'Publications'
							: 'News');
	$: tabs = [
		// {
		// 	tab: 'All',
		// 	res: news_count + events_count + people_count + laboratories_count + publications_count
		// },
		{
			tab: 'News',
			res: news_count
		},
		{
			tab: 'Events',
			res: events_count
		},
		{
			tab: 'People',
			res: people_count
		},
		{
			tab: 'Laboratories',
			res: laboratories_count
		},
		{
			tab: 'Publications',
			res: publications_count
		}
	];
</script>

<div class="container p-8">
	<Tabs.Root
		bind:value
		onValueChange={(value) => {
			// if (value == 'All') query.delete('tab');
			// else query.set('tab', value ?? '');
			query.set('tab', value ?? '');
			goto(`?${query.toString()}`, { noScroll: true });
		}}
	>
		<Tabs.List
			class="flex h-full w-full flex-wrap items-center justify-center border bg-background lg:mt-10"
		>
			{#each tabs as { tab, res }}
				<Tabs.Trigger
					value={tab}
					class="focus:ring-none rounded-none data-[state=active]:shadow-none lg:data-[state=active]:border-b-2"
					>{tab} ({res})</Tabs.Trigger
				>
			{/each}
		</Tabs.List>

		{#each tabs as { tab, res }}
			<Tabs.Content value={tab}>
				{#if res > 0}
					<div class="py-5">
						<p class="text-3xl font-bold">
							{res} Search result{#if res !== 1}s{/if} for
							<span class="font-normal">{$page.url.searchParams.get('q')}</span>
							<span>in {tab}</span>
							<!-- {#if tab !== 'All'}
								<span>in {tab}</span>
							{/if} -->
						</p>
					</div>
					<!-- {#if tab === 'All'}
						<Await {layout} data={news} text="news" component={NewsSearchResult} count={news_count} />
						<Await
							{layout}
							data={events}
							text="events"
							component={EventsSearchResult}
							count={events_count}
						/>
						<Await
							{layout}
							data={people}
							text="people"
							component={PeopleSearchResult}
							count={people_count}
						/>
						<Await
							{layout}
							data={laboratories}
							text="laboratories"
							component={LaboratoriesSearchResult}
							count={laboratories_count}
						/>
						<Await
							{layout}
							data={publications}
							text="publications"
							component={PublicationsSearchResult}
							count={publications_count}
						/>
					{/if} -->
					{#if tab === 'News'}
						<Await
							{layout}
							data={news}
							text="news"
							component={NewsSearchResult}
							count={news_count}
						/>
					{/if}
					{#if tab === 'Events'}
						<Await
							{layout}
							data={events}
							text="events"
							component={EventsSearchResult}
							count={events_count}
						/>
					{/if}
					{#if tab === 'People'}
						<Await
							{layout}
							data={people}
							text="people"
							component={PeopleSearchResult}
							count={people_count}
						/>
					{/if}
					{#if tab === 'Laboratories'}
						<Await
							{layout}
							data={laboratories}
							text="laboratories"
							component={LaboratoriesSearchResult}
							count={laboratories_count}
						/>
					{/if}
					{#if tab === 'Publications'}
						<Await
							{layout}
							data={publications}
							text="publications"
							component={PublicationsSearchResult}
							count={publications_count}
						/>
					{/if}
				{:else}
					<div class="relative h-[50vh]">
						<div class="absolute left-0 top-0 flex h-full w-full items-center justify-center">
							<Search class="h-[30vh] w-[30vh] text-secondary/25" />
						</div>
						<div class="absolute left-0 top-0 flex h-full w-full items-center justify-center">
							<p class="text-center">
								{#if $page.url.searchParams.get('q')}
									No search results for <b>{$page.url.searchParams.get('q')}</b>
									<span>in {tab}</span>
									<!-- {#if tab !== 'All'}
										<span>in {tab}</span>
									{/if} -->
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

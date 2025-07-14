<script lang="ts">
	/** @type {import('./$types').PageData} */
	import * as Pagination from '$lib/@shadcn-svelte/ui/pagination/index';
	import { Moon } from 'svelte-loading-spinners';
	import { ChevronLeft, ChevronRight, Frown } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let onDark = false;
	export let layout;
	export let data;
	export let text;
	export let component;
	export let count;
	export let display_count: number;

	$: query = new URLSearchParams($page.url.searchParams.toString());
	$: currentPage = parseInt(query.get('page') ?? '1');

	function nav(page: number): void {
		query.delete('page');
		if (page != 1) {
			query.append('page', page.toString());
		}
		goto(`?${query.toString()}`, { noScroll: true, keepFocus: true });
	}
</script>

<div class="flex flex-col gap-y-2">
	{#await data}
		<div class="flex flex-col items-center justify-center gap-5">
			<Moon
				size="90"
				color={onDark ? 'hsl(0, 0%, 100%)' : 'hsl(144, 69%, 24%)'}
				unit="px"
				duration="1s"
			/>
			<p>Loading {text}...</p>
		</div>
	{:then data}
		<div class={layout}>
			{#each data as item}
				<svelte:component this={component} {item} />
			{/each}
		</div>
	{:catch}
		<div class="flex flex-col items-center justify-center gap-5">
			<Frown size="90" color={onDark ? 'hsl(0, 0%, 100%)' : 'hsl(144, 69%, 24%)'} />
			<p>Error loading {text}. Please try refreshing the page.</p>
		</div>
	{/await}

	<Pagination.Root {count} perPage={display_count} onPageChange={nav} let:pages>
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton>
					<ChevronLeft class="h-4 w-4" />
					<span class="hidden sm:block">Previous</span>
				</Pagination.PrevButton>
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage === page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton>
					<span class="hidden sm:block">Next</span>
					<ChevronRight class="h-4 w-4" />
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
</div>

<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { Moon } from 'svelte-loading-spinners';
	import { ChevronsUp, Frown, Plus } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let onDark = false;
	export let layout;
	export let data;
	export let text;
	export let component;
	export let count;
	export let limit: number;

	$: query = new URLSearchParams($page.url.searchParams.toString());
	$: currentLimit = parseInt(query.get('limit') ?? limit.toString());

	function nav(newLimit: number): void {
		query.delete('limit');
		if (newLimit > limit) {
			query.append('limit', newLimit.toString());
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
			<p class={onDark ? 'text-[hsl(0, 0%, 100%)]' : 'text-[hsl(144, 69%, 24%)]'}>
				Loading {text}...
			</p>
		</div>
	{:then data}
		<div class={layout}>
			{#each data as item}
				<svelte:component this={component} {item} />
			{/each}
		</div>
		<div class="flex flex-col items-center gap-2">
			<div class="flex items-center justify-center gap-1">
				{#if data.length < count}
					<button
						class="flex items-center rounded-3xl px-6 py-2 shadow-xl"
						on:click={() => nav(currentLimit + limit)}
					>
						<Plus color={onDark ? 'hsl(0, 0%, 100%)' : 'hsl(144, 69%, 24%)'} class="mr-2 h-4 w-4" />
						<span class={onDark ? 'text-[hsl(0, 0%, 100%)]' : 'text-[hsl(144, 69%, 24%)]'}
							>Load More</span
						>
					</button>
				{/if}
				{#if data.length > limit}
					<button
						class="flex items-center rounded-3xl px-6 py-2 shadow-xl"
						on:click={() => nav(limit)}
					>
						<ChevronsUp
							color={onDark ? 'hsl(0, 0%, 100%)' : 'hsl(144, 69%, 24%)'}
							class="mr-2 h-4 w-4"
						/>
						<span class={onDark ? 'text-[hsl(0, 0%, 100%)]' : 'text-[hsl(144, 69%, 24%)]'}
							>Collapse</span
						>
					</button>
				{/if}
			</div>
			<small class={onDark ? 'text-[hsl(0, 0%, 100%)]' : 'text-[hsl(144, 69%, 24%)]'}
				>Showing {Math.min(currentLimit, count)} items out of {count}</small
			>
		</div>
	{:catch}
		<div class="flex flex-col items-center justify-center gap-5">
			<Frown size="90" color={onDark ? 'hsl(0, 0%, 100%)' : 'hsl(144, 69%, 24%)'} />
			<p class={onDark ? 'text-[hsl(0, 0%, 100%)]' : 'text-[hsl(144, 69%, 24%)]'}>
				Error loading {text}. Please try refreshing the page.
			</p>
		</div>
	{/await}
</div>

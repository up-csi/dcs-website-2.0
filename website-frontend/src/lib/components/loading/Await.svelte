<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { Moon } from 'svelte-loading-spinners';
	import { Frown, Plus } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { page } from '$app/stores';

	export let onDark = false;
	export let layout;
	export let data: Promise<Array<object>>;
	export let text;
	export let component;
	export let count;
	export let limit: number;

	$: query = new URLSearchParams($page.url.searchParams.toString());
	$: offset = 0;

	const handleLoadMore = async ({ formData }: { formData: FormData }) => {
		formData.set('data', JSON.stringify(await data));
		formData.set('offset', (offset + limit).toString());
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'success' && result.data) {
				data = result.data.items;
				offset = offset + limit;
			}
		};
	};
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
					<form method="POST" action="?/loadMore&{query.toString()}" use:enhance={handleLoadMore}>
						<button type="submit" class="flex items-center rounded-3xl px-6 py-2 shadow-xl">
							<Plus
								color={onDark ? 'hsl(0, 0%, 100%)' : 'hsl(144, 69%, 24%)'}
								class="mr-2 h-4 w-4"
							/>
							<span class={onDark ? 'text-[hsl(0, 0%, 100%)]' : 'text-[hsl(144, 69%, 24%)]'}
								>Load More</span
							>
						</button>
					</form>
				{/if}
			</div>
			<small class={onDark ? 'text-[hsl(0, 0%, 100%)]' : 'text-[hsl(144, 69%, 24%)]'}
				>Showing {data.length} items out of {count}</small
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

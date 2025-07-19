<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { Moon } from 'svelte-loading-spinners';
	import { Frown, Plus } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { type ActionResult } from '@sveltejs/kit';

	export let onDark = false;
	export let layout;
	export let data: Promise<object[]>;
	export let text;
	export let component;
	export let count;

	let items: object[] = [];
	let offset: number = 0;
	$: query = new URLSearchParams($page.url.searchParams.toString());
	$: offset = 0;
	$: data.then((res) => (items = res));

	const handleLoadMore = ({ formData }: { formData: FormData }) => {
		formData.set('data', JSON.stringify(items));
		formData.set('offset', offset.toString());
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'success' && result.data) {
				items = result.data.items;
				offset = result.data.offset;
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
	{:then}
		<div class={layout}>
			{#each items as item}
				<svelte:component this={component} {item} />
			{/each}
		</div>
		<div class="flex flex-col items-center gap-2">
			<div class="flex items-center justify-center gap-1">
				{#if items.length < count}
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
				>Showing {items.length} items out of {count}</small
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

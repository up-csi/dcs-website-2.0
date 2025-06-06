<script lang="ts">
	import { ChevronUp, ChevronDown } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/@shadcn-svelte/ui/dropdown-menu';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let sort_options: string[];
	let hide = true;

	$: query = new URLSearchParams($page.url.searchParams.toString());
	$: sort = query.get('sort') ?? 'date';

	function sort_nav(value: string): void {
		if (value == 'author' || value == 'title') query.set('sort', value);
		else query.delete('sort');
		goto(`?${query.toString()}`, { noScroll: true });
	}
</script>

<div class="mt-5 flex max-w-[88vw] items-center justify-end gap-x-3">
	<span class="text-xs font-semibold uppercase text-muted-foreground"> SORT BY </span>
	<DropdownMenu.Root
		onOutsideClick={() => {
			hide = true;
		}}
	>
		<DropdownMenu.Trigger>
			<button
				class="flex items-center rounded-3xl border-2 px-4 py-1 text-sm"
				on:click={() => {
					hide = !hide;
				}}
			>
				<span>{$page.url.searchParams.get('sort') ?? 'date'}</span>
				{#if hide}
					<ChevronDown class="ml-2 h-4 w-4" />
				{:else}
					<ChevronUp class="ml-2 h-4 w-4" />
				{/if}
			</button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.RadioGroup value={sort}>
				{#each sort_options as sort_option}
					<DropdownMenu.RadioItem
						value={sort_option}
						on:click={() => {
							sort_nav(sort_option);
							hide = !hide;
						}}>{sort_option}</DropdownMenu.RadioItem
					>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

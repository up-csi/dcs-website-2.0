<script lang="ts">
	import type { FilterControl } from '$lib/types/filter_controls';
	import { ChevronUp, ChevronDown } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/@shadcn-svelte/ui/dropdown-menu';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let control: FilterControl;
	$: ({ name, categories } = control);

	let hide = true;

	function nav(name: string, value: string, checked: boolean): void {
		const query = new URLSearchParams($page.url.searchParams.toString());
		console.log(query.get(name));
		if (!checked) {
			query.append(name, value);
		} else {
			query.delete(name, value);
		}
		console.log(query.get(name));
		goto(`?${query.toString()}`, { noScroll: true });
	}
</script>

<DropdownMenu.Root
	onOutsideClick={() => {
		hide = true;
	}}
>
	<DropdownMenu.Trigger>
		<button
			class="flex items-center px-4 py-1 text-sm md:rounded-3xl md:border-2"
			on:click={() => {
				hide = !hide;
			}}
		>
			<span>{name}</span>
			{#if hide}
				<ChevronDown class="ml-2 h-4 w-4" />
			{:else}
				<ChevronUp class="ml-2 h-4 w-4" />
			{/if}
		</button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		{#if categories}
			<DropdownMenu.Group>
				{#each categories as { categoryName, checked }}
					<DropdownMenu.CheckboxItem
						bind:checked
						onCheckedChange={() => {
							nav(name, categoryName, checked);
							hide = true;
						}}>{categoryName}</DropdownMenu.CheckboxItem
					>
				{/each}
			</DropdownMenu.Group>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>

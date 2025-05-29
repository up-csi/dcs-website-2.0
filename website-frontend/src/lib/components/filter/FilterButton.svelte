<script lang="ts">
	import { ChevronUp, ChevronDown } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/@shadcn-svelte/ui/dropdown-menu';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let control;
	$: ({ name, categories } = control);

	let hide = true;

	$: query = new URLSearchParams($page.url.searchParams.toString());

	function nav(name: string, value: string): void {
		if (!query.has(name, value)) {
			query.append(name, value);
		} else {
			query.delete(name, value);
		}
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
			<span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
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
				{#each categories as categoryName}
					<DropdownMenu.CheckboxItem
						checked={query.has(name, categoryName)}
						onCheckedChange={() => {
							nav(name, categoryName);
							hide = !hide;
						}}>{categoryName}</DropdownMenu.CheckboxItem
					>
				{/each}
			</DropdownMenu.Group>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>

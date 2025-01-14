<script lang="ts">
	import type { FilterControl } from './filter_controls';
	import { ChevronUp, ChevronDown } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	export let control: FilterControl;
	$: ({ name, categories } = control);

	let hide = true;
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
							hide = true;
						}}>{categoryName}</DropdownMenu.CheckboxItem
					>
				{/each}
			</DropdownMenu.Group>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>

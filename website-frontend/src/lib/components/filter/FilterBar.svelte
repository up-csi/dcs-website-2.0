<script lang="ts">
	import type { FilterControls } from "./filter_controls";
	import { ListFilter } from 'lucide-svelte';
	import FilterButton from "./FilterButton.svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	
	export let controls: FilterControls;
</script>

<div
	class="mx-auto md:flex max-w-[94vw] rounded-lg bg-white p-6
	shadow-lg
	md:max-w-[82vw] items-center hidden"
>
	<div class="text-xs font-semibold uppercase text-gray-500 mr-4">
		<p>FILTER BY</p>
	</div>
	{#if controls}
		<div class="flex items-center gap-x-2">
			{#each controls as control}
				<FilterButton {control} />
			{/each}
		</div>
	{/if}
</div>

<div class="md:hidden flex justify-end">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger><ListFilter class="h-8 w-8" /></DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				{#if controls}
					{#each controls as control}
						<DropdownMenu.Label class="font-normal">
							<FilterButton {control} />
						</DropdownMenu.Label>
					{/each}
				{/if}
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
<script lang="ts">
	import type { FilterControls } from '$lib/types/filter_controls';
	import { ListFilter } from 'lucide-svelte';
	import FilterButton from './FilterButton.svelte';
	import * as DropdownMenu from '$lib/@shadcn-svelte/ui/dropdown-menu';
	export let controls: FilterControls;
</script>

<div
	class="mx-auto hidden max-w-[82vw] items-center justify-between rounded-lg
		bg-white
		p-6 shadow-lg md:flex"
>
	<div class="flex items-center">
		<div class="mr-4 text-xs font-semibold uppercase text-muted-foreground">
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
</div>

<div
	class="mx-auto flex w-[94vw] items-center justify-between rounded-lg
		bg-white
		p-6 shadow-lg md:hidden"
>
	<div class="mr-4 text-xs font-semibold uppercase text-muted-foreground">
		<p>FILTER BY</p>
	</div>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<ListFilter class="h-8 w-8" />
		</DropdownMenu.Trigger>
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

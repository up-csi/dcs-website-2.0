<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import NavList from '$lib/components/nav/NavList.svelte';
	import * as Sheet from '$lib/@shadcn-svelte/ui/sheet';
	import { ScrollArea } from '$lib/@shadcn-svelte/ui/scroll-area/index.js';
</script>

<div
	class="
    absolute mt-2 hidden h-fit w-full justify-center
	md:flex
"
>
	<nav
		class="
        sticky flex h-fit w-fit justify-between
        rounded-3xl border border-header bg-secondary px-5 md:z-50
    "
	>
		<ul
			class="
            bottom-10 right-0 flex w-full
            justify-center gap-2
        "
		>
			<NavList />
		</ul>
	</nav>
</div>

<div class="absolute right-0 top-0 m-3 md:hidden">
	<Sheet.Root>
		<Sheet.Trigger>
			<Menu class="h-8 w-8" />
		</Sheet.Trigger>
		<Sheet.Content>
			<div class="flex w-full justify-end">
				<Sheet.Close>
					<X class="h-8 w-8" />
				</Sheet.Close>
			</div>
			<ScrollArea class="h-full">
				<ul class="mb-4 mr-4">
					<NavList />
				</ul>
			</ScrollArea>
		</Sheet.Content>
	</Sheet.Root>
</div>

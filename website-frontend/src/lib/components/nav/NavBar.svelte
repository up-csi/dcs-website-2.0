<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import NavList from '$lib/components/nav/NavList.svelte';
	import * as Sheet from '$lib/@shadcn-svelte/ui/sheet';
	import { ScrollArea } from '$lib/@shadcn-svelte/ui/scroll-area/index.js';
</script>

<div
	class="
    hidden w-full absolute mt-2 md:flex h-fit
	justify-center
"
>
	<nav
		class="
        flex bg-secondary sticky md:z-50 h-fit
        w-fit justify-between rounded-3xl border border-header px-5
    "
	>
		<ul
			class="
            bottom-10 right-0 w-full gap-2
            flex justify-center
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

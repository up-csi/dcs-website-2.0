<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import NavList from '$lib/components/nav/NavList.svelte';
	import * as Sheet from '$lib/@shadcn-svelte/ui/sheet';
	import { ScrollArea } from '$lib/@shadcn-svelte/ui/scroll-area/index.js';
</script>

<div
	class="
    hidden w-full md:absolute md:mt-2 md:flex md:h-fit
	md:justify-center
"
>
	<nav
		class="
        fixed flex h-screen w-full justify-end bg-background/10 md:sticky md:z-50 md:h-fit
        md:w-fit md:justify-between md:rounded-3xl md:border md:border-header md:px-5
    "
	>
		<ul
			class="
            absolute bottom-10 right-0 w-full gap-2
            md:static md:flex md:justify-center
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

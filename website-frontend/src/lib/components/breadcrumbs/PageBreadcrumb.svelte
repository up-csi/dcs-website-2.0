<script lang="ts">
	import { deslugify } from '$lib/utils';
	import { page } from '$app/stores';
	import * as Breadcrumb from '$lib/@shadcn-svelte/ui/breadcrumb/index.js';
	import * as DropdownMenu from '$lib/@shadcn-svelte/ui/dropdown-menu/index.js';
	import type { NavPath, NavPaths } from '$lib/types/path';
	import { ChevronDown } from 'lucide-svelte';

	export let page_name: string = '';

	$: whole_path = $page.url.pathname.split('/').slice(1);
	$: app_path = '';

	let nav_paths: NavPaths = [];
	$: {
		nav_paths = [];
		whole_path.forEach((path_end) => {
			app_path = app_path.concat('/' + path_end);
			const add_path: NavPath = {
				to: deslugify(path_end),
				href: app_path
			}
			nav_paths = [...nav_paths, add_path];
		});
	}

	$: to_current_path = nav_paths.slice(0, -1);
	$: current_page = nav_paths[nav_paths.length - 1].to;
</script>

<div class="hidden border-b border-muted-foreground/40 pb-2 lg:block">
	<Breadcrumb.Root>
		<Breadcrumb.List class="text-xs font-medium hover:text-primary">
			<Breadcrumb.Item class="text-foreground">
				<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			{#each to_current_path as { to, href }}
				<Breadcrumb.Separator>/</Breadcrumb.Separator>
				<Breadcrumb.Item class="text-foreground">
					<Breadcrumb.Link {href}>{to}</Breadcrumb.Link>
				</Breadcrumb.Item>
			{/each}
			{#if current_page}
				<Breadcrumb.Separator>/</Breadcrumb.Separator>
				<Breadcrumb.Item>
					<Breadcrumb.Page class="font-medium text-muted-foreground/80"
						>{page_name ? page_name : current_page}</Breadcrumb.Page
					>
				</Breadcrumb.Item>
			{/if}
		</Breadcrumb.List>
	</Breadcrumb.Root>
</div>

<div class="border-b border-muted-foreground/40 pb-2 lg:hidden">
	<Breadcrumb.Root>
		<Breadcrumb.List class="text-xs font-medium hover:text-primary">
			<Breadcrumb.Item class="text-foreground">
				<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			{#if to_current_path}
				<Breadcrumb.Separator>/</Breadcrumb.Separator>
				<Breadcrumb.Item class="text-foreground">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class="flex items-center gap-1">
							<Breadcrumb.Ellipsis />
							<ChevronDown class="h-4 w-4" />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="start">
							{#each to_current_path as { to, href }}
								<DropdownMenu.Item>
									<a {href}>{to}</a>
								</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Breadcrumb.Item>
			{/if}
			{#if current_page}
				<Breadcrumb.Separator>/</Breadcrumb.Separator>
				<Breadcrumb.Item>
					<Breadcrumb.Page class="font-medium text-muted-foreground/80"
						>{page_name ? page_name : current_page}</Breadcrumb.Page
					>
				</Breadcrumb.Item>
			{/if}
		</Breadcrumb.List>
	</Breadcrumb.Root>
</div>

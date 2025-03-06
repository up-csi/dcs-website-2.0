<script lang="ts">
    import { deslugify } from '$lib/utils';
    import { page } from '$app/stores';
	import * as Breadcrumb from '$lib/@shadcn-svelte/ui/breadcrumb/index.js';
	import * as DropdownMenu from '$lib/@shadcn-svelte/ui/dropdown-menu/index.js';
    import type { NavPaths } from '$lib/types/path';
    import { ChevronDown } from 'lucide-svelte';

    const whole_path = $page.url.pathname.split('/').slice(1);
    let app_path = '';

    let nav_paths: NavPaths = [];
    whole_path.forEach(path_end => {
        app_path = app_path.concat('/' + path_end);
        nav_paths.push({
            to: (path_end === '') ? 'Home' : deslugify(path_end),
            href: app_path,
        });
    });

    const to_current_path: NavPaths = nav_paths.slice(0, -1);
    const current_page = nav_paths[nav_paths.length - 1].to;
</script>

<div class="hidden lg:block pb-2 border-b border-muted-foreground/40">
    <Breadcrumb.Root>
        <Breadcrumb.List class="hover:text-primary text-xs font-medium">
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
                    <Breadcrumb.Page class="text-muted-foreground/80 font-medium">{current_page}</Breadcrumb.Page>
                </Breadcrumb.Item>
            {/if}
        </Breadcrumb.List>
    </Breadcrumb.Root>
</div>

<div class="lg:hidden pb-2 border-b border-muted-foreground/40">
    <Breadcrumb.Root>
        <Breadcrumb.List class="hover:text-primary text-xs font-medium">
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
                    <Breadcrumb.Page class="text-muted-foreground/80 font-medium">{current_page}</Breadcrumb.Page>
                </Breadcrumb.Item>
            {/if}
        </Breadcrumb.List>
    </Breadcrumb.Root>
</div>
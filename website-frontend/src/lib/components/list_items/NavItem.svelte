<script lang="ts">
	import Button from '$lib/@shadcn-svelte/ui/button/button.svelte';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { page } from '$app/stores';

	export let href: string,
		to: string,
		dropdown: boolean = false,
		position: string = '',
		custom: string = '';

	let show = false;
</script>

<!-- NavItem -->
<li
	class="relative hidden w-full list-none rounded-xl transition-colors duration-300 ease-in-out hover:bg-primary/10 lg:block {custom}"
	on:mouseenter={() => {
		show = true;
	}}
	on:mouseleave={() => {
		show = false;
	}}
>
	<div
		class="
        flex items-center justify-start border-0
        px-2 text-sm
    "
	>
		<Button
			variant="link"
			{href}
			class="
            px-1 py-2 text-left text-primary-dark hover:no-underline
			"
		>
			<span class="relative mr-1 inline-block">
				{to}
				{#if $page.url.pathname === href}
					<div class="absolute -bottom-[11px] left-0 h-[2px] w-full bg-secondary-red" />
				{/if}
			</span>
			{#if dropdown}
				{#if show}
					<ChevronUp class="h-4 w-4 opacity-65" />
				{:else}
					<ChevronDown class="h-4 w-4 opacity-65" />
				{/if}
			{/if}
		</Button>
	</div>
	{#if show && dropdown}
		<div class="absolute h-2 w-full bg-transparent"></div>
		<ul
			class="
				full absolute mt-2 w-fit rounded-lg
				bg-white p-0.5 px-1 shadow-lg
				{position}
			"
		>
			<slot />
		</ul>
	{/if}
</li>

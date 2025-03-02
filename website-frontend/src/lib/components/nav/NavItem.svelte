<script lang="ts">
    import * as Accordion from "$lib/@shadcn-svelte/ui/accordion";
	import Button from '$lib/@shadcn-svelte/ui/button/button.svelte';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';

	export let href: string,
		to: string,
		dropdown: boolean = false,
		position: string = '',
		custom: string = '';

	let show = false;
</script>

<!-- NavItem -->
<li
	class="relative hidden w-full list-none transition-colors duration-300 ease-in-out hover:border-b-2 lg:block {custom}"
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
        px-2 text-sm *:text-secondary-foreground
    "
	>
		<Button
			variant="link"
			{href}
			class="
            px-1 py-2 text-left hover:no-underline
			"
		>
			<span class="pr-1 font-bold">{to}</span>
			{#if dropdown}
				{#if show}
					<ChevronUp class="h-4 w-4" />
				{:else}
					<ChevronDown class="h-4 w-4" />
				{/if}
			{/if}
		</Button>
	</div>
	{#if show && dropdown}
		<ul
			class="
				full absolute w-fit rounded-lg border
				bg-background/10 p-0.5 pr-4
				{position}
			"
		>
			<slot />
		</ul>
	{/if}
</li>

<!-- Mobile NavItem -->
<div class="lg:hidden w-full py-2">
	{#if dropdown}
		<Accordion.Root>
			<Accordion.Item value={to} class="border-none">
				<div class="flex items-center justify-start">
					<a {href} class="mr-5">{to}</a>
					<Accordion.Trigger class="py-0" />
				</div>
				<Accordion.Content>
					<slot />
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	{:else}
    	<a {href}>{to}</a>
	{/if}
</div>
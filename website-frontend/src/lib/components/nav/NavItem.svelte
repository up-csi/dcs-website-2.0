<script lang="ts">
	import Button from '$lib/@shadcn-svelte/ui/button/button.svelte';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';

	export let href: string,
		to: string,
		dropdown: boolean = false,
		position: string = '',
		custom: string = '';

	let show = false;
</script>

<li
	class="relative hidden w-full list-none transition-colors duration-300 ease-in-out hover:border-b-2 md:block {custom}"
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

<li class="relative w-full transition-colors duration-300 ease-in-out md:hidden {custom}">
	<div
		class="
        flex items-center justify-end border-r-2 py-1 pr-2 text-right text-sm
    "
	>
		<a {href} class="mr-1 font-bold">{to}</a>
		<Button
			variant="ghost"
			class="p-0 hover:bg-background/0"
			on:click={() => {
				show = !show;
			}}
		>
			{#if dropdown}
				{#if show}
					<ChevronUp />
				{:else}
					<ChevronDown />
				{/if}
			{/if}
		</Button>
	</div>
	{#if show && dropdown}
		<ul
			class="
                w-full bg-background pr-4
                {position}
            "
		>
			<slot />
		</ul>
	{/if}
</li>

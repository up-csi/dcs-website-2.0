<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';

	export let href: string,
		to: string,
		dropdown: boolean = false,
		position: string = '',
		custom: string = '';

	let show = false;
</script>

<li
	class="hidden md:block list-none relative w-full transition-colors duration-300 hover:border-b-2 ease-in-out {custom}"
	on:mouseenter={() => { show = true; }}
	on:mouseleave={() => { show = false; }}
>
	<div
		class="
        flex items-center justify-start px-2
        text-sm border-0 *:text-secondary-foreground
    "
	>
		<Button variant="link" {href} 
			class="
            px-1 py-2 text-left hover:no-underline
			"
		>
			<span class="font-bold">{to}</span>
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
				w-fit full pr-4 absolute rounded-lg
				border p-0.5 bg-background/10
				{position}
			"
		>
			<slot />
		</ul>
	{/if}
</li>

<li
	class="md:hidden relative w-full transition-colors duration-300 ease-in-out {custom}"
>
	<div
		class="
        flex items-center justify-end text-sm border-r-2 pr-2 text-right py-1
    "
	>
		<a {href} class="font-bold mr-1">{to}</a>
		<Button variant="ghost" class="p-0 hover:bg-background/0" on:click={() => { show = !show; }}>
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
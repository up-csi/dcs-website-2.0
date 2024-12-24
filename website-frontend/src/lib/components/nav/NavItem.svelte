<script lang="ts">
	import { slide } from 'svelte/transition';
	export let href: string,
		to: string,
		dropdown: boolean = false,
		position: string = '',
		custom: string = '';
	let show = false;
</script>

<li
	class="relative w-full transition-colors duration-300 ease-in-out hover:bg-accent md:rounded-sm {custom}"
	on:mouseenter={() => {
		show = true;
	}}
	on:mouseleave={() => {
		show = false;
	}}
>
	<div
		class="
        flex justify-end
        text-2xl md:block md:text-sm
    "
	>
		{#if dropdown}
			<button
				class="md:hidden"
				on:click={() => {
					show = !show;
				}}
			>
				{#if show}
					&#8593;
				{:else}
					&#8595;
				{/if}
			</button>
		{/if}
		<a
			{href}
			class="
            flex w-fit justify-end border-r-2 px-3 py-1 text-right
            md:items-center md:justify-start md:border-0 md:text-left
        ">{to}</a
		>
	</div>
	{#if show && dropdown}
		<ul
			class="
                w-full bg-background pr-4 md:absolute md:w-40 md:rounded-lg
                md:border md:p-0.5
                {position}
            "
			transition:slide
		>
			<slot />
		</ul>
	{/if}
</li>

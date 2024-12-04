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
	class="w-full relative md:rounded-sm transition-colors duration-300 ease-in-out hover:bg-accent {custom}"
	on:mouseenter={() => {
		show = true;
	}}
	on:mouseleave={() => {
		show = false;
	}}
>
	<div
		class="
        md:text-sm md:block
        text-2xl flex justify-end
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
            px-3 py-1 flex md:items-center md:justify-start md:text-left md:border-0
            justify-end w-fit text-right border-r-2
        ">{to}</a
		>
	</div>
	{#if show && dropdown}
		<ul
			class="
                md:absolute md:w-40 md:p-0.5 bg-background md:border md:rounded-lg
                w-full pr-4
                {position}
            "
			transition:slide
		>
			<slot />
		</ul>
	{/if}
</li>

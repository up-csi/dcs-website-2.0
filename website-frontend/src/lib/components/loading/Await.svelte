<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { Moon } from 'svelte-loading-spinners';
	import { Frown } from 'lucide-svelte';

	export let onDark = false;
	export let layout;
	export let data;
	export let text;
	export let component;
</script>

{#await data}
	<div class="flex flex-col items-center justify-center gap-5">
		<Moon
			size="90"
			color={onDark ? 'hsl(0, 0%, 100%)' : 'hsl(144, 69%, 24%)'}
			unit="px"
			duration="1s"
		/>
		<p>Loading {text}...</p>
	</div>
{:then data}
	<div class={layout}>
		{#each data as item}
			<svelte:component this={component} {item} />
		{/each}
	</div>
{:catch}
	<div class="flex flex-col items-center justify-center gap-5">
		<Frown size="90" color={onDark ? 'hsl(0, 0%, 100%)' : 'hsl(144, 69%, 24%)'} />
		<p>Error loading {text}. Please try refreshing the page.</p>
	</div>
{/await}

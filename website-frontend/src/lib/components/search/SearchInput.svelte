<script lang="ts">
	import { Search, X } from 'lucide-svelte';

	export let search_open = false;
	let typing = false;

	let txt_area: HTMLInputElement;
	let txt_area_mobile: HTMLInputElement;
</script>

<div class="hidden h-fit w-full lg:block">
	<form action="" class="rounded-3xl {search_open ? 'border' : 'border-0'}">
		<div class="flex w-full items-center pl-3 pr-1">
			<input
				type="text"
				class="w-full focus:outline-none lg:{search_open ? 'block' : 'hidden'}"
				bind:this={txt_area}
				on:input={() => {
					typing = true;
				}}
			/>

			{#if typing}
				<button
					class="mr-2 flex h-10 w-10 items-center justify-center"
					on:click={() => {
						txt_area.value = '';
						typing = false;
					}}><X class="h-8 w-8 rounded-3xl bg-secondary p-1" /></button
				>
			{:else}
				<button
					type="submit"
					class="flex h-10 w-10 items-center justify-center"
					on:click={() => {
						search_open = !search_open;
					}}><Search class="h-10 text-secondary hover:text-primary" /></button
				>
			{/if}
		</div>
	</form>
</div>

<div class="h-fit w-full lg:hidden">
	<form action="" class="rounded-3xl border">
		<div class="flex w-full items-center pl-3 pr-1">
			<input
				type="text"
				class="w-full focus:outline-none lg:{search_open ? 'block' : 'hidden'}"
				bind:this={txt_area_mobile}
				on:input={() => {
					typing = true;
				}}
			/>

			{#if typing}
				<button
					class="mr-2 flex h-10 w-10 items-center justify-center"
					on:click={() => {
						txt_area_mobile.value = '';
						typing = false;
					}}><X class="h-8 w-8 rounded-3xl bg-secondary p-1" /></button
				>
			{:else}
				<button
					type="submit"
					class="flex h-10 w-10 items-center justify-center"
					on:click={() => {
						search_open = !search_open;
					}}><Search class="h-10 text-secondary hover:text-primary" /></button
				>
			{/if}
		</div>
	</form>
</div>

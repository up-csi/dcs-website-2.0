<script lang="ts">
	import { Search, X } from 'lucide-svelte';

	export let search_open = false;
	let searchInput = '';
</script>

<div class="hidden h-fit w-full lg:block">
	<form action="/search/{searchInput}" class="rounded-3xl {search_open ? 'border' : 'border-0'}">
		<div class="flex w-full items-center pl-3 pr-1">
			<input
				type="text"
				class="w-full focus:outline-none lg:{search_open ? 'block' : 'hidden'}"
				bind:value={searchInput}
				on:submit={() => {
					search_open = false;
					searchInput = '';
				}}
			/>

			{#if searchInput}
				<button
					type="button"
					class="mr-2 flex h-10 w-10 items-center justify-center"
					on:click={() => {
						search_open = !search_open;
						searchInput = '';
					}}><X class="h-8 w-8 rounded-3xl bg-secondary p-1" /></button
				>
			{:else}
				<button
					type="button"
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
	<form action="/search/{searchInput}" class="rounded-3xl border">
		<div class="flex w-full items-center pl-3 pr-1">
			<input
				type="text"
				class="w-full focus:outline-none lg:{search_open ? 'block' : 'hidden'}"
				bind:value={searchInput}
				on:submit={() => {
					search_open = false;
					searchInput = '';
				}}
			/>

			{#if searchInput}
				<button
					type="button"
					class="mr-2 flex h-10 w-10 items-center justify-center"
					on:click={() => {
						search_open = !search_open;
						searchInput = '';
					}}><X class="h-8 w-8 rounded-3xl bg-secondary p-1" /></button
				>
			{:else}
				<button
					type="button"
					class="flex h-10 w-10 items-center justify-center"
					on:click={() => {
						search_open = !search_open;
					}}><Search class="h-10 text-secondary hover:text-primary" /></button
				>
			{/if}
		</div>
	</form>
</div>

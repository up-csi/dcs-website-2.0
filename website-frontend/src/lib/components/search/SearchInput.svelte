<script lang="ts">
	import { Search, X } from 'lucide-svelte';
	import { mobileOpen, searchOpen, searchInput } from '$lib/stores';
</script>

<div class="hidden h-fit w-full lg:block">
	<form
		action="/search"
		class="rounded-3xl {$searchOpen ? 'border' : 'border-0'}"
		on:submit={() => {
			$mobileOpen = false;
		}}
	>
		<div class="flex w-full items-center pl-3 pr-1">
			<input
				name="q"
				type="text"
				class="w-full focus:outline-none lg:{$searchOpen ? 'block' : 'hidden'}"
				bind:value={$searchInput}
			/>

			{#if $searchOpen}
				<button
					type="button"
					class="mr-2 flex h-10 w-10 items-center justify-center"
					on:click={() => {
						$searchOpen = !$searchOpen;
					}}><X class="h-8 w-8 rounded-3xl bg-secondary p-1" /></button
				>
			{:else}
				<button
					type="button"
					class="flex h-10 w-10 items-center justify-center"
					on:click={() => {
						$searchOpen = !$searchOpen;
					}}><Search class="h-10 text-secondary hover:text-primary" /></button
				>
			{/if}
		</div>
	</form>
</div>

<div class="h-fit w-full lg:hidden">
	<form
		action="/search"
		class="rounded-3xl border"
		on:submit={() => {
			$mobileOpen = false;
		}}
	>
		<div class="flex w-full items-center pl-3 pr-1">
			<input
				name="q"
				type="text"
				class="w-full focus:outline-none lg:{$searchOpen ? 'block' : 'hidden'}"
				bind:value={$searchInput}
			/>

			{#if $searchInput}
				<button
					type="button"
					class="mr-2 flex h-10 w-10 items-center justify-center"
					on:click={() => {
						$searchInput = '';
					}}><X class="h-8 w-8 rounded-3xl bg-secondary p-1" /></button
				>
			{:else}
				<div class="flex h-10 w-10 items-center justify-center">
					<Search class="h-10 text-secondary hover:text-primary" />
				</div>
			{/if}
		</div>
	</form>
</div>

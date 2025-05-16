<script lang="ts">
	import { Input } from '$lib/@shadcn-svelte/ui/input';
	import { page } from '$app/stores';

	export let placeholder: string;

	$: query = new URLSearchParams($page.url.searchParams.toString()).get('q');
</script>

<form class="flex w-full max-w-sm items-center space-x-2">
	<Input name="q" type="text" {placeholder} class="max-w-xs" bind:value={query} />
</form>

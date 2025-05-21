<script lang="ts">
	import { Input } from '$lib/@shadcn-svelte/ui/input';
	import { contentSearchBarInput } from '$lib/stores';
	import { page } from '$app/stores';

	$: query = new URLSearchParams($page.url.searchParams.toString()).get('q');
	$: if (query) contentSearchBarInput.set(query);

	export let placeholder: string;
</script>

<form class="flex w-full max-w-sm items-center space-x-2">
	<Input name="q" type="text" {placeholder} class="max-w-xs" bind:value={$contentSearchBarInput} />
</form>

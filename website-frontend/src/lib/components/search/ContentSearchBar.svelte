<script lang="ts">
	import { Input } from '$lib/@shadcn-svelte/ui/input';

	export let placeholder: string;
</script>

<form class="flex w-full max-w-sm items-center space-x-2">
	<Input name="q" type="text" {placeholder} class="max-w-xs" />
</form>

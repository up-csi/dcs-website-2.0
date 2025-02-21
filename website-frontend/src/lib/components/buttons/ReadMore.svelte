<script lang="ts">
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import { ChevronDown } from 'lucide-svelte';
	export let showFull: boolean;
</script>

<Button
	class="flex items-center rounded-full bg-background/20 leading-none hover:bg-background/30"
	on:click={() => (showFull = true)}
>
	<span>Read more</span>
	<ChevronDown class="ml-[5px] mt-[2px] h-4 w-4" />
</Button>

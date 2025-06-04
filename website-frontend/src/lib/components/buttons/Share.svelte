<script lang="ts">
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import { Share, ThumbsUp } from 'lucide-svelte';

	let text = 'Share';

	export let link: string;
</script>

<Button
	on:click={() => {
		navigator.clipboard.writeText(link);
		text = 'Copied';
		setTimeout(() => {
			text = 'Share';
		}, 3000);
	}}
	variant="outline"
	class="hidden gap-x-2 rounded-full md:flex"
	>{text}
	{#if text === 'Copied'}
		<ThumbsUp class="size-4" />
	{:else}
		<Share class="size-4" />
	{/if}
</Button>
<Button
	on:click={() => {
		navigator.clipboard.writeText(link);
		alert('Share link copied!');
	}}
	variant="outline"
	class="flex gap-x-2 rounded-full md:hidden"><Share class="size-4" /></Button
>

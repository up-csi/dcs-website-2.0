<script lang="ts">
	import { onMount } from 'svelte';
	import { enhanceWysiwygContent } from '.';
	export let content: string = '';

	let enhancedContent = content;

	onMount(() => {
		enhancedContent = content ? enhanceWysiwygContent(content) : '';
	});
</script>

{#if content}
	{@html enhancedContent}
{/if}

<script lang="ts">
	import { onMount } from 'svelte';
	import { enhanceWysiwygContent } from '.';
	export let content: string = '';

	let enhancedContent = content;

	onMount(() => {
		enhancedContent = content ? enhanceWysiwygContent(content) : '';
	});

	$: if (typeof window !== 'undefined') {
		enhancedContent = content ? enhanceWysiwygContent(content) : '';
	}
</script>

{#if content}
<div class="prose !max-w-none">
	{@html enhancedContent}
</div>
{/if}

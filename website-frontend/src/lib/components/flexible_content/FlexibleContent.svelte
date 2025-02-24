<script lang="ts">
	import { onMount } from 'svelte';
	import { enhanceWysiwygContent } from '.';
	export let content: string = '';
	export let isDark: boolean = false;

	let enhancedContent = content;

	onMount(() => {
		enhancedContent = content ? enhanceWysiwygContent(content, isDark) : '';
	});

	$: if (typeof window !== 'undefined') {
		enhancedContent = content ? enhanceWysiwygContent(content, isDark) : '';
	}
</script>

{#if content}
	<div class="prose !max-w-none">
		{@html enhancedContent}
	</div>
{/if}

<script lang="ts">
	import { enhanceWysiwygContent } from '.';
	export let content: string = '';

	$: enhancedContent = content ? enhanceWysiwygContent(content) : '';
</script>

{#if enhancedContent}
	{@html enhancedContent}
{/if}

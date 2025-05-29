<script lang="ts">
	export let content: string = '';
</script>

{#if content}
	<div class="prose !max-w-none">
		{@html content}
	</div>
{/if}

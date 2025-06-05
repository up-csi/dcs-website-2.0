<script lang="ts">
	export let content: string = '';
	export let inverted: boolean = false;
</script>

{#if content}
	{#if !inverted}
		<div class="prose !max-w-none">
			{@html content}
		</div>
	{:else}
		<div class="prose !max-w-none invert">
			{@html content}
		</div>
	{/if}
{/if}

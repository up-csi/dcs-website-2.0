<script lang="ts">
	import { Plus } from 'lucide-svelte';
	export let inc: number;

	export let shown = inc;
	function loadMore() {
		shown += inc;
	}
</script>

<button class="flex items-center rounded-3xl px-6 py-2 shadow-xl" on:click={loadMore}>
	<Plus class="mr-2 h-4 w-4" />
	<span>Load More</span>
</button>

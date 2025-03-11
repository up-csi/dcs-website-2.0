<script lang="ts">
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import { ChevronRight } from 'lucide-svelte';

	export let link: string = '';
	export let text: string = '';
</script>

<Button class="rounded-full" variant="outline" href={link}>
	<p class="flex items-center gap-1 text-xs font-semibold">
		{text}
		<ChevronRight class="h-3 w-3" />
	</p>
</Button>

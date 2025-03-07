<script lang="ts">
	import { Button } from '$lib/@shadcn-svelte/ui/button';
    import { ChevronRight } from 'lucide-svelte';

    export let link: string = '';
    export let text: string = '';
</script>

<Button
	class="rounded-full"
	variant="outline"
	href={link}
>
	<p class="text-xs font-semibold flex items-center gap-1">
		{text}
		<ChevronRight class="w-3 h-3" />
	</p>
</Button>
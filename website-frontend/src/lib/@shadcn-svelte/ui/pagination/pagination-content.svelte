<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/@shadcn-svelte/utils.js";

	type $$Props = HTMLAttributes<HTMLUListElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<ul class={cn("flex flex-row items-center gap-1", className)} {...$$restProps}>
	<slot />
</ul>

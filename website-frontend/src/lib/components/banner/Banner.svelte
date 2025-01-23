<script lang="ts">
	import { deslugify } from '$lib/utils';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let title: string;
	export let background_image: string = '';
	export let flexible_content: string = '';
	export let from_bottom: string = '';

	let text_bottom = 'bottom-9';
	$: if (from_bottom) {
		text_bottom = from_bottom;
	} else if (flexible_content) {
		text_bottom = 'bottom-24';
	}

	let height = `h-[40vh]`;
	$: if (flexible_content) {
		height = 'h-[45vh]';
	}

	let max_height = 'md:h-[50vh]';
	$: if (flexible_content) {
		max_height = 'md:h-[60vh]';
	}

	let font_size = 'md:text-5xl';
	$: if (flexible_content) {
		font_size = 'md-text-4xl';
	}

	$: deslugify_title = deslugify(title);
</script>

<div class="relative z-0">
	<div 
		class="{height} bg-cover bg-center {max_height}" 
		style="background-image: linear-gradient(to top, hsl(var(--primary)), transparent), url('{PUBLIC_APIURL}/assets/{background_image}')"
	></div>

	<div
		class="absolute {text_bottom} left-1/2
        -translate-x-1/2 transform text-center text-primary-foreground
        md:left-0 md:max-w-[60vw] md:translate-x-0 md:px-32 md:text-start"
	>
		<h1 class="text-3xl font-bold {font_size}">{deslugify_title}</h1>
		{#if flexible_content}
			<h4 class="hidden text-muted md:mt-4 md:block">{@html flexible_content}</h4>
		{/if}
	</div>
</div>

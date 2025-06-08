<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';

	export let title: string;
	export let background_image: string = '';
	export let flexible_content: string = '';
	let banner_height: number;

	let background =
		'background-image: linear-gradient(to top, hsl(var(--primary)) -20%, hsl(var(--secondary)) 55%)';
	$: if (background_image && banner_height) {
		background = `background-image: linear-gradient(to top, hsl(var(--primary)) -20%, transparent 55%), url('${PUBLIC_APIURL}/assets/${background_image}?height=${banner_height}')`;
	}
</script>

<div class="relative z-0" bind:clientHeight={banner_height}>
	<div class="h-[45vh] bg-cover bg-center md:h-[60vh]" style={background}></div>

	<div
		class="absolute bottom-11 w-full px-10 text-center text-white
		md:flex md:justify-center"
	>
		<div class="flex w-full max-w-6xl flex-col gap-y-4 text-center md:text-start">
			<h1 class="text-3xl font-bold leading-none md:max-w-[60vw] md:text-5xl">{title}</h1>
			{#if flexible_content}
				<h4 class="text-sm md:max-w-[60vw] md:text-base">{@html flexible_content}</h4>
			{/if}
		</div>
	</div>
</div>

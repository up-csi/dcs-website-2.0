<script lang="ts">
	import { deslugify } from '$lib/utils';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let title: string;
	export let background_image: string = '';
	export let flexible_content: string = '';

	let background =
		'background-image: linear-gradient(to top, hsl(var(--primary)) -20%, hsl(var(--secondary)) 55%)';
	$: if (background_image) {
		background = `background-image: linear-gradient(to top, hsl(var(--primary)) -20%, transparent 55%), url('${PUBLIC_APIURL}/assets/${background_image}')`;
	}

	$: deslugify_title = deslugify(title);
</script>

<div class="relative z-0">
	<div class="h-[45vh] bg-cover bg-center md:h-[60vh]" style={background}></div>

	<div
		class="absolute bottom-11 w-full text-white px-4 text-center
		md:flex md:justify-center"
	>
		<div class="w-full max-w-6xl text-center md:text-start">
			<h1 class="text-3xl font-bold leading-none md:text-5xl md:max-w-[50vw]">{deslugify_title}</h1>
			{#if flexible_content}
				<h4 class="hidden md:mt-4 md:block md:max-w-[50vw]">{@html flexible_content}</h4>
			{/if}
		</div>
	</div>
</div>
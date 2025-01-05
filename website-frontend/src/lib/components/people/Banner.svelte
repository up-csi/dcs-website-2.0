<script lang="ts">
	import { deslugify } from '$lib/utils';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let title: string;
	export let background_image: string;
	export let flexible_content: string;

	$: deslugify_title = deslugify(title);
</script>

<div class="relative z-0">
	<div
		class="h-[45vh] bg-cover bg-center md:h-[60vh]"
		style="background-image: linear-gradient(to top, #004420, transparent), url('{PUBLIC_APIURL}/assets/{background_image}')"
	></div>

	<div
		class="absolute bottom-24 left-1/2
        -translate-x-1/2 transform text-center text-white
        md:left-0 md:max-w-[60vw] md:translate-x-0 md:px-32 md:text-start"
	>
		<h1 class="text-3xl font-bold md:mb-4 md:text-4xl">{deslugify_title}</h1>
		<h4 class="hidden text-gray-300 md:block">{@html flexible_content}</h4>
	</div>
</div>

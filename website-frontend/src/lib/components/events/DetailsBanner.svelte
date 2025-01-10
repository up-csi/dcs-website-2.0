<script lang="ts">
	import { deslugify } from '$lib/utils';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let title: string;
	export let background_image: string;
	export let location: string;
	export let start_date: string;
	export let end_date: string;

	$: deslugify_title = deslugify(title);
</script>

<div class="relative z-0">
	<div
		class="h-[45vh] bg-cover bg-center md:h-[70vh]"
		style="background-image: linear-gradient(to top, #004420, transparent), url('{PUBLIC_APIURL}/assets/{background_image}')"
	></div>

	<div
		class="-mt-[0.1px] w-full bg-[#004420] pb-10 pt-10 md:absolute md:bottom-10 md:bg-transparent md:pb-0"
	>
		<div
			class="flex w-full
            flex-col items-center px-5 text-center
            md:flex-row md:justify-between md:px-32 md:text-start"
		>
			<div class="text-white md:max-w-[60vw]">
				<h1 class="text-3xl font-bold md:mb-4 md:text-4xl">{deslugify_title}</h1>
				<div class="my-6 text-gray-300 md:my-0 md:flex">
					<h4 class="md:mr-10">{@html location}</h4>
					<h4>Start Time - End Time</h4>
				</div>
			</div>

			<div class="flex flex-row items-center md:pl-12">
				<div
					class="flex h-28 w-28 flex-col items-center justify-center rounded-lg bg-white text-gray-900 shadow-xl md:h-36 md:w-36"
				>
					<h1 class="text-4xl font-bold md:mb-2 md:text-5xl">18</h1>
					<h3 class="font-medium text-[#004420]">January</h3>
				</div>

				{#if end_date}
					<div class="mx-3 h-1 w-3 bg-gray-300"></div>
					<div
						class="flex h-28 w-28 flex-col items-center justify-center rounded-lg bg-white text-gray-900 shadow-xl md:h-36 md:w-36"
					>
						<h1 class="text-4xl font-bold md:mb-2 md:text-5xl">20</h1>
						<h3 class="font-medium text-[#004420]">January</h3>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import FacebookIcon from '$lib/assets/FacebookIcon.svelte';
	import XIcon from '$lib/assets/XIcon.svelte';
	export let assets;
</script>

<div class="h-14 items-center bg-slate-50 py-2 md:h-16">
	<div class="flex justify-between px-2 md:px-9">
		<div class="my-auto flex items-center">
			<img
				src={assets.favicon}
				alt="UP"
				class="mr-1 hidden h-12 w-12 max-w-xs rounded-full bg-gray-400 md:block"
			/>
			<img
				src={assets.favicon}
				alt="DCS"
				class="mr-2 h-10 w-10 max-w-xs rounded-full bg-gray-400 md:mr-3 md:h-12 md:w-12"
			/>
			<div class="font-semibold text-[#004420]">
				<h1 class="text-xs md:text-sm">University of the Philippines Diliman</h1>
				<h1 class="text-md -mt-1 md:-mt-2 md:text-lg">Department of Computer Science</h1>
			</div>
		</div>
		<div class="my-auto flex items-center">
			<a
				href="https://web.facebook.com/upddcs?_rdc=1&_rdr"
				target="_blank"
				rel="noopener noreferrer"
				class="mr-3 hidden h-7 pb-[2px] text-gray-400 transition-colors duration-300 hover:text-[#004420] md:block"
			>
				<FacebookIcon />
			</a>
			<a
				href="https://x.com/upcs"
				target="_blank"
				rel="noopener noreferrer"
				class="hidden h-5 text-gray-400 transition-colors duration-300 hover:text-[#004420] md:block"
			>
				<XIcon />
			</a>
		</div>
	</div>
</div>

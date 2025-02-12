<script lang="ts">
	import FacebookIcon from '$lib/assets/FacebookIcon.svelte';
	import XIcon from '$lib/assets/XIcon.svelte';
	export let favicon;
	export let facebook_link;
	export let x_link;
</script>

<div class="h-14 items-center py-2 md:h-16">
	<div class="flex justify-between px-2 md:px-9">
		<div class="my-auto flex items-center">
			<img
				src={favicon}
				alt="UP"
				class="mr-1 hidden h-12 w-12 max-w-xs rounded-full bg-secondary md:block"
			/>
			<img
				src={favicon}
				alt="DCS"
				class="mr-2 h-10 w-10 max-w-xs rounded-full bg-secondary md:mr-3 md:h-12 md:w-12"
			/>
			<div class="font-semibold text-primary">
				<h1 class="text-xs md:text-sm">University of the Philippines Diliman</h1>
				<h1 class="text-md -mt-1 md:-mt-2 md:text-lg">Department of Computer Science</h1>
			</div>
		</div>
		<div class="my-auto flex items-center">
			<a
				href={facebook_link}
				target="_blank"
				rel="noopener noreferrer"
				class="mr-3 hidden h-7 pb-[2px] text-secondary transition-colors duration-300 hover:text-primary md:block"
			>
				<FacebookIcon />
			</a>
			<a
				href={x_link}
				target="_blank"
				rel="noopener noreferrer"
				class="hidden h-5 text-secondary transition-colors duration-300 hover:text-primary md:block"
			>
				<XIcon />
			</a>
		</div>
	</div>
</div>

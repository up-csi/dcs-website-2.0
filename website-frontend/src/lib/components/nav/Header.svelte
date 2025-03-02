<script lang="ts">
	import FacebookIcon from '$lib/assets/FacebookIcon.svelte';
	import XIcon from '$lib/assets/XIcon.svelte';
	import { Menu, X } from 'lucide-svelte';
	import NavList from '$lib/components/nav/NavList.svelte';
	import MobileNavList from '$lib/components/nav/MobileNavList.svelte';
    import SearchInput from "../search/SearchInput.svelte";

	export let favicon;
	export let facebook_link;
	export let x_link;


	let search_open = false;

	export let open = false;

	let mobile_nav_display_block = "hidden";
	let mobile_nav_display_flex = "hidden";
	let mobile_display_favicon = "flex";
	let header_justify = "justify-center";
	let header_stick = "";

	$: if (open) {
		mobile_nav_display_block = "block";
		mobile_nav_display_flex = "flex";
		mobile_display_favicon = "hidden";
		header_justify = "w-full justify-between";
		header_stick = "fixed w-full z-50";
	} else {
		mobile_nav_display_block = "hidden";
		mobile_nav_display_flex = "hidden";
		mobile_display_favicon = "flex";
		header_justify = "justify-center";
		header_stick = "";
	}
</script>

<div class="h-14 items-center py-2 lg:h-16 {header_stick} bg-background">
	<div class="flex justify-between px-2 lg:px-9">
		<!-- Favicons -->
		<div class="my-auto {mobile_display_favicon} items-center justify-center">
			<img
				src={favicon}
				alt="UP"
				class="mr-1 hidden h-12 w-12 max-w-xs rounded-full bg-secondary lg:block"
			/>
			<img
				src={favicon}
				alt="DCS"
				class="mr-2 h-10 w-10 max-w-xs rounded-full bg-secondary lg:mr-3 lg:h-12 lg:w-12"
			/>
			<div class="font-semibold text-primary">
				<h1 class="text-xs lg:text-sm">University of the Philippines Diliman</h1>
				<h1 class="text-md -mt-1 lg:-mt-2 lg:text-lg">Department of Computer Science</h1>
			</div>
		</div>

		<div class="flex items-center {header_justify}">
			<div class="hidden lg:block">
				<SearchInput bind:search_open />
			</div>

			<!-- Social Media Links -->
			<div class="flex items-center justify-center">
				<a
					href={facebook_link}
					target="_blank"
					rel="noopener noreferrer"
					class="mx-3 {mobile_nav_display_block} h-7 pb-[2px] text-secondary transition-colors duration-300 hover:text-primary lg:block"
				>
					<FacebookIcon />
				</a>
				<a
					href={x_link}
					target="_blank"
					rel="noopener noreferrer"
					class="mr-3 {mobile_nav_display_block} h-5 text-secondary transition-colors duration-300 hover:text-primary lg:block"
				>
					<XIcon />
				</a>
			</div>

			<!-- Mobile Navbar -->
			<div class="lg:hidden h-10 w-10">
				<button on:click={() => { open = !(open); }}>
					{#if open}
						<X class="w-full h-full border border-secondary rounded-full p-2 text-secondary hover:text-primary" />
					{:else}
						<Menu class="w-full h-full border border-secondary rounded-full p-2 text-secondary hover:text-primary" />
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>


<!-- Navbar -->
<div
	class="
    absolute mt-2 hidden h-fit w-full justify-center
	lg:flex
"
	on:click={() => { search_open = false; }}
>
	<nav
		class="
        sticky flex h-fit w-fit justify-between
        rounded-3xl border border-header bg-secondary px-5 lg:z-50
    "
	>
		<ul
			class="
            bottom-10 right-0 flex w-full
            justify-center gap-2
        "
		>
			<NavList />
		</ul>
	</nav>
</div>


<!-- Mobile Navbar -->
<div
	class="
    fixed my-14 h-screen w-full justify-center bg-background
	{mobile_nav_display_flex} z-50
"
>	
	<nav class="w-full">
		<!-- Favicons -->
		<div class="my-2 flex items-center justify-center lg:hidden">
			<img
				src={favicon}
				alt="UP"
				class="mr-1 hidden h-12 w-12 max-w-xs rounded-full bg-secondary lg:block"
			/>
			<img
				src={favicon}
				alt="DCS"
				class="mr-2 h-10 w-10 max-w-xs rounded-full bg-secondary lg:mr-3 lg:h-12 lg:w-12"
			/>
			<div class="font-semibold text-primary">
				<h1 class="text-xs lg:text-sm">University of the Philippines Diliman</h1>
				<h1 class="text-md -mt-1 lg:-mt-2 lg:text-lg">Department of Computer Science</h1>
			</div>
		</div>

		<div class="p-20 pt-0 *:pt-5">
			<SearchInput />
			<MobileNavList bind:open />
		</div>
	</nav>
</div>
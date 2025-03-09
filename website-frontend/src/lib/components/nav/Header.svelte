<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import FacebookIcon from '$lib/assets/FacebookIcon.svelte';
	import XIcon from '$lib/assets/XIcon.svelte';
	import { Menu, X } from 'lucide-svelte';
	import NavList from '$lib/components/nav/NavList.svelte';
	import { ScrollArea } from '$lib/@shadcn-svelte/ui/scroll-area/index.js';
	import SearchInput from '$lib/components/search/SearchInput.svelte';
	import { searchOpen, mobileOpen } from '$lib/stores';
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

	export let primary_logo;
	export let secondary_logo;
	export let secondary_logo_link;
	export let facebook_link;
	export let x_link;

	let atTop = writable(true); // Track if at the top
	let lastScrollY = 0;
	let isVisible = writable(true); // Track navbar visibility

	onMount(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// Check if we're at the top of the page
			atTop.set(currentScrollY === 0);

			// Show navbar when scrolling up, hide when scrolling down
			if (currentScrollY > lastScrollY) {
				isVisible.set(false); // Hide when scrolling down
			} else {
				isVisible.set(true); // Show when scrolling up
			}

			lastScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div class="h-14 items-center bg-background/80 backdrop-blur-md py-2 lg:h-16 {$mobileOpen ? 'fixed z-50 w-full' : ''}">
	<div class="flex justify-between px-2 lg:px-9">
		<!-- Favicons -->
		<div class="my-auto items-center justify-center {$mobileOpen ? 'hidden' : 'flex'}">
			<a href="/">
				<img
					src="{PUBLIC_APIURL}/assets/{primary_logo}"
					alt="DCS"
					class="mr-2 h-10 w-10 max-w-xs rounded-full object-cover bg-secondary lg:mr-1 lg:h-12 lg:w-12"
				/></a
			>
			<a href={secondary_logo_link ? secondary_logo_link : undefined} target="_blank">
				<img
					src="{PUBLIC_APIURL}/assets/{secondary_logo}"
					alt="UP"
					class="hidden h-12 w-12 max-w-xs rounded-full bg-secondary lg:block lg:mr-3 "
				/>
			</a>
			<div class="font-semibold text-primary">
				<h1 class="text-xs lg:text-sm">University of the Philippines Diliman</h1>
				<h1 class="text-md -mt-1 lg:-mt-2 lg:text-lg">Department of Computer Science</h1>
			</div>
		</div>

		<div class="flex items-center {$mobileOpen ? 'w-full justify-between' : 'justify-center'}">
			<div class="hidden lg:block">
				<SearchInput />
			</div>

			<!-- Social Media Links -->
			<div class="flex items-center justify-center">
				<a
					href={facebook_link}
					target="_blank"
					rel="noopener noreferrer"
					class="mx-3 h-7 pb-[2px] text-secondary transition-colors duration-300 hover:text-primary lg:block {$mobileOpen
						? 'block'
						: 'hidden'}"
				>
					<FacebookIcon />
				</a>
				<a
					href={x_link}
					target="_blank"
					rel="noopener noreferrer"
					class="mr-3 h-5 text-secondary transition-colors duration-300 hover:text-primary lg:block {$mobileOpen
						? 'block'
						: 'hidden'}"
				>
					<XIcon />
				</a>
			</div>

			<!-- Mobile Navbar -->
			<div class="h-10 w-10 lg:hidden">
				<button
					on:click={() => {
						$mobileOpen = !$mobileOpen;
					}}
					id="mobile-toggle"
				>
					{#if $mobileOpen}
						<X
							class="h-full w-full rounded-full border border-secondary p-2 text-secondary hover:text-primary"
						/>
					{:else}
						<Menu
							class="h-full w-full rounded-full border border-secondary p-2 text-secondary hover:text-primary"
						/>
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Navbar -->
<div
	class="hidden w-full justify-center lg:flex transition-all duration-300 ease-in-out fixed z-50"
	class:top-[4.5rem]={$atTop}
	class:top-3={!$atTop}
	class:-translate-y-[calc(100%+0.75rem)]={!$isVisible}
>
	<button
		on:click={() => {
			$searchOpen = false;
		}}
	>
		<nav
			class="
			sticky flex h-fit w-fit justify-between
			rounded-3xl border border-primary/15 bg-white/80 backdrop-blur-2xl px-5 lg:z-50
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
	</button>
</div>

<!-- Mobile Navbar -->
<div
	class="
    fixed z-50 my-14 h-screen w-full
	bg-background {$mobileOpen ? 'flex' : 'hidden'}
"
>
	<nav class="w-full">
		<!-- Favicons -->
		<div class="my-2 flex items-center justify-center lg:hidden">
			<a href="/">
				<img
					src="{PUBLIC_APIURL}/assets/{primary_logo}"
					alt="UP"
					class="mr-1 hidden h-12 w-12 max-w-xs rounded-full bg-secondary lg:block"
				/>
			</a>
			<a href={secondary_logo_link ? secondary_logo_link : undefined} target="_blank">
				<img
					src="{PUBLIC_APIURL}/assets/{secondary_logo}"
					alt="DCS"
					class="mr-2 h-10 w-10 max-w-xs rounded-full bg-secondary lg:mr-3 lg:h-12 lg:w-12"
				/>
			</a>
			<div class="font-semibold text-primary">
				<h1 class="text-xs lg:text-sm">University of the Philippines Diliman</h1>
				<h1 class="text-md -mt-1 lg:-mt-2 lg:text-lg">Department of Computer Science</h1>
			</div>
		</div>

		<div class="p-20 pt-0 *:pt-5">
			<SearchInput />
			<ScrollArea id="mobile-nav" class="h-[70dvh] w-full *:text-xl *:font-bold">
				<NavList />
			</ScrollArea>
		</div>
	</nav>
</div>

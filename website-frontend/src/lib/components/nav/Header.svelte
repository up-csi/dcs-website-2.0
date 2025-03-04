<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import FacebookIcon from '$lib/assets/FacebookIcon.svelte';
	import XIcon from '$lib/assets/XIcon.svelte';
	import { Menu, X } from 'lucide-svelte';
	import NavList from '$lib/components/nav/NavList.svelte';
	import { ScrollArea } from '$lib/@shadcn-svelte/ui/scroll-area/index.js';
	import SearchInput from '$lib/components/search/SearchInput.svelte';
	import { onMount } from 'svelte';

	export let primary_logo;
	export let secondary_logo;
	export let secondary_logo_link;
	export let facebook_link;
	export let x_link;

	let search_open = false;
	let mobile_open = false;

	onMount(() => {
		const links = Array.from(document.getElementsByTagName('a'));
		const mobile_toggle = document.getElementById('mobile-toggle');

		links.forEach((link) => {
			link.addEventListener('click', () => {
				if (mobile_open) {
					mobile_toggle?.click();
				}
			});
		});
	});
</script>

<div class="h-14 items-center bg-background py-2 lg:h-16 {mobile_open ? 'fixed z-50 w-full' : ''}">
	<div class="flex justify-between px-2 lg:px-9">
		<!-- Favicons -->
		<div class="my-auto items-center justify-center {mobile_open ? 'hidden' : 'flex'}">
			<a href="/">
				<img
					src="{PUBLIC_APIURL}/assets/{primary_logo}"
					alt="UP"
					class="mr-1 hidden h-12 w-12 max-w-xs rounded-full bg-secondary lg:block"
				/></a
			>
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

		<div class="flex items-center {mobile_open ? 'w-full justify-between' : 'justify-center'}">
			<div class="hidden lg:block">
				<SearchInput bind:search_open />
			</div>

			<!-- Social Media Links -->
			<div class="flex items-center justify-center">
				<a
					href={facebook_link}
					target="_blank"
					rel="noopener noreferrer"
					class="mx-3 h-7 pb-[2px] text-secondary transition-colors duration-300 hover:text-primary lg:block {mobile_open
						? 'block'
						: 'hidden'}"
				>
					<FacebookIcon />
				</a>
				<a
					href={x_link}
					target="_blank"
					rel="noopener noreferrer"
					class="mr-3 h-5 text-secondary transition-colors duration-300 hover:text-primary lg:block {mobile_open
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
						mobile_open = !mobile_open;
					}}
					id="mobile-toggle"
				>
					{#if mobile_open}
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
	class="
    absolute mt-2 hidden h-fit w-full justify-center
	lg:flex
"
>
	<button
		on:click={() => {
			search_open = false;
		}}
	>
		<nav
			class="
			sticky flex h-fit w-fit justify-between
			rounded-3xl border border-secondary bg-secondary/25 px-5 lg:z-50
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
	 bg-background {mobile_open ? 'flex' : 'hidden'}
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

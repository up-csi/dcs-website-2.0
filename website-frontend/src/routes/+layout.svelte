<script lang="ts">
	/** @type {import('./$types').LayoutData} */
	import { PUBLIC_APIURL } from '$env/static/public';
	import { page } from '$app/stores';
	import { Moon } from 'svelte-loading-spinners';
	import { fade } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { navigating } from '$app/stores';

	export let data;

	let marginType = 'default';

	$: {
		if ($page.url.pathname === '/') {
			marginType = 'wide';
		} else {
			marginType = 'default';
		}
	}

	$: ({
		title,
		description,
		favicon,
		primary_logo,
		secondary_logo,
		secondary_logo_link,
		contact_number,
		contact_email,
		address,
		quick_links,
		facebook_link,
		about_pages,
		people_categories,
		academics_categories,
		academics_programs,
		academics_pages,
		laboratories,
		miscellaneous_pages,
		students_pages
	} = data);

	import '../app.postcss';

	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/nav/Header.svelte';
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="icon" href="{PUBLIC_APIURL}/assets/{favicon}?fit=cover&height=45&width=45" />
	<meta name="description" content={description} />
</svelte:head>

{#if $navigating}
	<div
		in:fade={{ duration: 300, easing: cubicIn }}
		out:fade={{ duration: 300, easing: cubicOut }}
		class="fixed inset-0 z-[100] h-screen w-screen bg-gray-500 opacity-50"
	></div>

	<div
		in:fade={{ duration: 300, easing: cubicIn }}
		out:fade={{ duration: 300, easing: cubicOut }}
		class="fixed inset-0 z-[100] flex items-center justify-center"
	>
		<Moon size="20" color="hsl(358.9, 75.7%, 27.5%)" unit="vh" />
	</div>
{/if}

<div class="flex h-full flex-col justify-between">
	<header class="w-full overflow-clip">
		<Header
			{primary_logo}
			{secondary_logo}
			{secondary_logo_link}
			{facebook_link}
			{about_pages}
			{people_categories}
			{academics_categories}
			{academics_programs}
			{academics_pages}
			{laboratories}
			{miscellaneous_pages}
			{students_pages}
		/>
	</header>

	<main class="w-full overflow-clip bg-slate-50">
		<div
			class={`px-4 md:px-8 ${marginType === 'wide' ? 'max-w-[1330px]' : 'max-w-[1220px]'} mx-auto w-full 2xl:max-w-screen-2xl`}
		>
			<slot />
		</div>
	</main>

	<footer class="w-full overflow-clip bg-background-dark">
		<div
			class={`px-4 md:px-8 ${marginType === 'wide' ? 'max-w-[1330px]' : 'max-w-[1220px]'} mx-auto w-full 2xl:max-w-screen-2xl`}
		>
			<Footer {contact_number} {contact_email} {address} {quick_links} {facebook_link} />
		</div>
	</footer>
</div>

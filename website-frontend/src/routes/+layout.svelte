<script lang="ts">
	/** @type {import('./$types').LayoutData} */
	import { PUBLIC_APIURL } from '$env/static/public';
	import { page } from '$app/stores';

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
		x_link,
		about_pages,
		people_categories,
		academics_categories,
		academics_programs,
		academics_pages,
		laboratories,
		students_pages
	} = data);

	import '../app.postcss';

	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/nav/Header.svelte';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="icon" href="{PUBLIC_APIURL}/assets/{favicon}" />
	<meta name="description" content={description} />
</svelte:head>

<div class="flex h-full flex-col justify-between">
	<header class="w-full overflow-clip">
		<Header
			{primary_logo}
			{secondary_logo}
			{secondary_logo_link}
			{facebook_link}
			{x_link}
			{about_pages}
			{people_categories}
			{academics_categories}
			{academics_programs}
			{academics_pages}
			{laboratories}
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
			<Footer {contact_number} {contact_email} {address} {quick_links} {facebook_link} {x_link} />
		</div>
	</footer>
</div>

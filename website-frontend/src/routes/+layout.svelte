<script lang="ts">
	/** @type {import('./$types').LayoutData} */
	import { PUBLIC_APIURL } from '$env/static/public';

	export let data;

	$: ({
		title,
		description,
		favicon,
		contact_number,
		contact_email,
		address,
		quick_links,
		facebook_link,
		x_link
	} = data);

	import '../app.postcss';

	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/nav/Header.svelte';
	import NavBar from '$lib/components/nav/NavBar.svelte';

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

<header>
	<Header favicon="{PUBLIC_APIURL}/assets/{favicon}" {facebook_link} {x_link} />
	<NavBar />
</header>

<main>
	<slot />
</main>

<footer>
	<Footer {contact_number} {contact_email} {address} {quick_links} {facebook_link} {x_link} />
</footer>

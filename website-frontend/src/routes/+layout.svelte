<script lang="ts">
	/** @type {import('./$types').LayoutData} */

	export let data;

	$: ({ global, assets } = data);

	import '../app.postcss';

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
	<title>{global.title}</title>
	<link rel="icon" href={assets.favicon} />
	<meta name="description" content={global.description} />
</svelte:head>

<header>
	<Header {assets} />
	<NavBar />
</header>

<main>
	<slot />
</main>

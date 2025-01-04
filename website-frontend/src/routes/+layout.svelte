<script lang="ts">
	/** @type {import('./$types').LayoutData} */

	export let data;

	$: ({ global, assets } = data);

	import '../app.postcss';

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
	<div class="bg-slate-50 h-14 md:h-16 items-center py-2">
		<div class="flex justify-between md:px-9 px-2">

			<div class="flex items-center my-auto">
				<img
					src="{assets.favicon}"
					alt="UP"
					class="hidden md:block max-w-xs rounded-full bg-gray-400 h-12 w-12 mr-1"
				/>
				<img
					src="{assets.favicon}"
					alt="DCS"
					class="max-w-xs rounded-full bg-gray-400 h-10 w-10 md:h-12 md:w-12 mr-2 md:mr-3"
				/>
				<div>
					<h1 class="text-xs md:text-sm font-semibold text-[#004420]">University of the Philippines</h1>
					<h1 class="text-md md:text-lg font-semibold text-[#004420] -mt-1 md:-mt-2">Department of Computer Science</h1>
				</div>
			</div>

			<div class="flex items-center my-auto">

				<a href="https://web.facebook.com/upddcs?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" 
				class="hidden md:block h-7 pb-[2px] mr-3 text-gray-400 hover:text-[#004420] transition-colors duration-300">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
						height="100%" width="100%" viewBox="0 0 512 512" xml:space="preserve" class="h-full w-full">
						<path d="M512,257.555c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z" style="fill:currentColor;fill-rule:nonzero;"/>
					</svg>
				</a>

				<a href="https://x.com/upcs" target="_blank" rel="noopener noreferrer" 
				class="hidden md:block h-5 text-gray-400 hover:text-[#004420] transition-colors duration-300">
					<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1200 1227" fill="none">
						<g clip-path="url(#clip0_1_2)">
							<path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" 
							class="fill-current"/>
						</g>
						<defs>
							<clipPath id="clip0_1_2">
								<rect width="1200" height="1227" fill="white"/>
							</clipPath>
						</defs>
					</svg>
				</a>

			</div>
		</div>
	</div>

	<NavBar />

</header>

<main>
	<slot />
</main>

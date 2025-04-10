<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';

	import { PUBLIC_APIURL } from '$env/static/public';

	export let data;

	$: ({ laboratories } = data);
</script>

<FullWidthBreakout>
	<Banner
		title="Research"
		flexible_content={'The Department of Computer Science houses nine research laboratories catering to theoretical and applied fields in computer science.'}
	/>
</FullWidthBreakout>

<div class="pb-11 md:pb-20">
	<div class="py-2 md:py-8">
		<Breadcrumb />
	</div>

	{#each laboratories as laboratory}
		<div class="my-5 border-b pb-5 md:grid md:grid-cols-6 md:items-center">
			<div>
				<img src="{PUBLIC_APIURL}/assets/{laboratory.logo}" alt={laboratory.name} />
			</div>
			<div class="pt-5 md:col-span-5 md:pl-5 md:pt-0">
				<div class="md:flex md:items-center">
					<h3 class="mr-5">{laboratory.name}</h3>
					<a href="/research/labs/{laboratory.slug}" class="hidden md:block">View Lab &#8594;</a>
				</div>
				<p class="line-clamp-2 max-h-12 overflow-hidden">{laboratory.description}</p>
				<a href="/research/labs/{laboratory.slug}" class="md:hidden">View Lab &#8594;</a>
			</div>
		</div>
	{/each}
</div>

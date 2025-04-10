<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import HorizontalCard from '$lib/components/cards/HorizontalCard.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';

	export let data;
	$: ({ academics_category, academics_programs } = data);
</script>

{#if academics_category}
	<FullWidthBreakout>
		<Banner title="{academics_category.name} Programs" />
	</FullWidthBreakout>

	<div class="pb-16 md:pb-24">
		<div class="pt-2 pb-8 md:py-8">
			<Breadcrumb />
		</div>

		<div class="space-y-16 md:space-y-24">
			{#each academics_programs as program}
				{#if typeof program.category !== 'string'}
					<a href="{program.category.slug}/programs/{program.slug}" class="block">
						<HorizontalCard name={program.title} />
					</a>
				{/if}
			{/each}
		</div>
	</div>
{:else}
	<p>Page not found</p>
{/if}

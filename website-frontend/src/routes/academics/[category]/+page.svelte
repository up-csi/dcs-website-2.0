<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import LinkButton from '$lib/components/buttons/LinkButton.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import HorizontalCard from '$lib/components/cards/HorizontalCard.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';

	export let data;
	$: ({ academics_category, academics_programs, academics_pages } = data);
</script>

{#if academics_category}
	<FullWidthBreakout>
		<Banner title={academics_category.name} />
	</FullWidthBreakout>

	<div class="pb-16 md:pb-24">
		<div class="py-2 pb-8 md:py-8">
			<Breadcrumb />
		</div>

		<div class="space-y-16 md:space-y-24">
			<div class="prose text-base">
				{#if academics_category.flexible_content}
					<FlexibleContent content={academics_category.flexible_content} />
				{:else}
					<p>Page is empty.</p>
				{/if}
			</div>

			<div>
				<h1 class="mb-6 text-2xl font-bold leading-tight md:mb-10 md:text-3xl">
					{academics_category.name} Programs
				</h1>
				<div class="space-y-3">
					{#each academics_programs as program}
						{#if typeof program.category !== 'string'}
							<a href="{program.category.slug}/programs/{program.slug}" class="block">
								<HorizontalCard name={program.title} />
							</a>
						{/if}
					{/each}
				</div>
			</div>

			<div>
				<h1 class="mb-3 text-2xl font-bold leading-tight md:mb-6 md:text-3xl">Other Things</h1>
				<div class="space-y-1">
					<LinkButton
						text="{academics_category.name} Courses"
						link="{academics_category.slug}/courses"
					/>
					{#if academics_pages}
						{#each academics_pages as page}
							<LinkButton text={page.title} link="{academics_category.slug}/{page.slug}" />
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
{:else}
	<p>Page not found</p>
{/if}

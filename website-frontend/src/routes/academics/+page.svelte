<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import CoursesTable from '$lib/components/table/CoursesTable.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import HorizontalCard from '$lib/components/cards/HorizontalCard.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import ContentSearchBar from '$lib/components/search/ContentSearchBar.svelte';

	export let data;
	$: ({ academics, academics_categories, academics_courses, curriculum_last_updated } = data);
</script>

{#if academics}
	<FullWidthBreakout>
		<Banner title="Academics" background_image={academics.background_image ?? ''} />
	</FullWidthBreakout>

	<div class="pb-16 md:pb-24">
		<div class="py-2 md:py-8">
			<Breadcrumb />
		</div>

		<div class="space-y-16">
			<div class="prose text-base">
				{#if academics.flexible_content}
					<FlexibleContent content={academics.flexible_content} />
				{:else}
					<p>Page is empty.</p>
				{/if}
			</div>

			<div>
				<h1 class="heading-text heading-padding">Programs offered by the department</h1>
				{#if academics_categories}
					<div class="space-y-3">
						{#each academics_categories as acad_category}
							<a href="academics/{acad_category.slug}" class="block">
								<HorizontalCard
									name={acad_category.name}
									description={acad_category.description ?? undefined}
								/>
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<div>
				<div class="heading-padding">
					<h1 class="heading-text">Courses offered by the department</h1>
					<p class="ml-[2px] mt-2 text-xs font-medium opacity-55">
						Last Updated: {curriculum_last_updated.toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
				</div>
				<div class="flex flex-col gap-y-5">
					<ContentSearchBar placeholder="Search a course" />
					<CoursesTable {academics_courses} />
				</div>
			</div>
		</div>
	</div>
{:else}
	<p>Page not found</p>
{/if}

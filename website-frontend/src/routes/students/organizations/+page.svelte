<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import OrganizationItem from '$lib/components/list_items/OrganizationItem.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	export let data;

	$: ({ students_organizations, students_organizations_overview } = data);

	const title = 'Student Organizations';
</script>

<FullWidthBreakout>
	<Banner {title} background_image={students_organizations_overview.background_image ?? ''} />
</FullWidthBreakout>

<div class="pb-16 md:pb-24">
	<div class="pb-8 pt-2 md:py-8">
		<Breadcrumb page_name={title} />
	</div>

	{#if students_organizations_overview.flexible_content}
		<div class="mb-10 w-full">
			<FlexibleContent content={students_organizations_overview.flexible_content} />
		</div>
	{/if}

	<p class="heading-text heading-padding">CS Network</p>

	{#each students_organizations as organization}
		<OrganizationItem {organization} />
	{/each}
</div>

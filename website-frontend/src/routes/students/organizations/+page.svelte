<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import OrganizationItem from '$lib/components/list_items/OrganizationItem.svelte';
	import { PUBLIC_APIURL } from '$env/static/public';
	export let data;

	$: ({ students_organizations, students_organizations_overview } = data);

	const title = 'Student Organizations';
</script>

<body>
	<Banner
		{title}
		background_image={students_organizations_overview.background_image ?? ''}
	/>

	<div class="mx-20 mb-36">
		<div class="my-5">
			<Breadcrumb page_name={title} />
		</div>

		{#if students_organizations_overview.flexible_content}
            <div class="w-full px-40 mb-10">
                <FlexibleContent content={students_organizations_overview.flexible_content} />
            </div>
        {/if}
		
		<p class="font-bold text-2xl">CS Network</p>

		{#each students_organizations as organization}
			<OrganizationItem {organization} />
		{/each}
	</div>
</body>

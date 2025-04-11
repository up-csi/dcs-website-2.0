<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';

	export let data;
	const { students_overview } = data;
</script>

<FullWidthBreakout>
	<Banner
		title="Students"
		background_image={students_overview.background_image ?? ''}
		flexible_content={students_overview.flexible_content}
	/>
</FullWidthBreakout>

<div class="pb-16 md:pb-24">
	<div class="py-2 pb-8 md:py-8">
		<Breadcrumb />
	</div>
</div>

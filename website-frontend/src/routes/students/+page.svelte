<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';

	export let data;
	const { students_overview } = data;
</script>

<body>
	<Banner
		title="Students"
		background_image={students_overview.background_image ?? ''}
		flexible_content={students_overview.flexible_content}
	/>

	<div class="mx-20">
		<div class="my-5">
			<Breadcrumb />
		</div>
	</div>
</body>

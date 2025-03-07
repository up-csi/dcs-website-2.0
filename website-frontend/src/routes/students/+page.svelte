<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';

	export let data;
	const { students_overview } = data;
</script>

<body>
	<div class="relative z-0">
		<Banner
			title="Students"
			background_image={students_overview.background_image ?? ''}
			flexible_content={students_overview.flexible_content}
		/>
	</div>

	<div class="px-4 py-10">
		<div class="mb-5">
			<Breadcrumb />
		</div>
	</div>
</body>

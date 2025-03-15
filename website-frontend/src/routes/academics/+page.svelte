<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import LinkButton from '$lib/components/buttons/LinkButton.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import CoursesTable from '$lib/components/table/CoursesTable.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';

	export let data;
	$: ({ academics, academics_courses } = data);
</script>

<body>
	{#if academics}
		<Banner title="Academics" />

		<div class="flex justify-center px-4">
			<div class="w-full max-w-6xl space-y-10 pb-16 md:space-y-16 md:pb-24">
				<div class="pt-5">
					<Breadcrumb />
				</div>
				<div class="prose text-base">
					{#if academics.flexible_content}
						<FlexibleContent content={academics.flexible_content} />
					{:else}
						<p>Page is empty.</p>
					{/if}
				</div>
				<div>
					<h1 class="heading-text mb-3 md:mb-6">Programs offered by the department</h1>
					<div class="space-y-1">
						<LinkButton text="Undergraduate Page" link="academics/undergraduate" />
						<LinkButton text="Graduate Page" link="academics/graduate" />
					</div>
				</div>
				<div>
					<div class="heading-padding">
						<h1 class="heading-text">Courses offered by the department</h1>
						<p class="ml-[2px] mt-2 text-xs font-medium opacity-55">Last Updated: March XX, 2025</p>
					</div>
					<CoursesTable data={academics_courses} />
				</div>
			</div>
		</div>
	{:else}
		<p>Page not found</p>
	{/if}
</body>

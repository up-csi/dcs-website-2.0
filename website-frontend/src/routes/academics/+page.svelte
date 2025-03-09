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
			<div class="w-full max-w-6xl pb-16 md:pb-24">
				<div class="space-y-10 md:space-y-16">
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
						<h1 class="mb-3 text-2xl font-bold leading-tight md:mb-6 md:text-3xl">
							Programs offered by the department
						</h1>
						<div class="space-y-1">
							<LinkButton text="Undergraduate Page" link="academics/undergraduate" />
							<LinkButton text="Graduate Page" link="academics/graduate" />
						</div>
					</div>

					<div>
						<div class="mb-6 md:mb-10">
							<h1 class="text-2xl font-bold leading-tight md:text-3xl">
								Courses offered by the department
							</h1>
							<p class="ml-[2px] mt-2 text-xs font-medium opacity-55">
								Last Updated: March XX, 2025
							</p>
						</div>
						<CoursesTable data={academics_courses} />
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p>Page not found</p>
	{/if}
</body>

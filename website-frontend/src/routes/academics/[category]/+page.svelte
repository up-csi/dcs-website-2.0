<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import LinkButton from '$lib/components/buttons/LinkButton.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import HorizontalCard from '$lib/components/cards/HorizontalCard.svelte';
	import CoursesTable from '$lib/components/table/CoursesTable.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';

	export let data;
	$: ({ academics_category, academics_programs, academics_courses } = data);
</script>

<body>
	{#if academics_category}
		<Banner title={academics_category.name} />

		<div class="flex justify-center px-4">
			<div class="pb-16 md:pb-24 max-w-6xl w-full">
				<div class="space-y-12 md:space-y-16">

					<div class="pt-5">
						<Breadcrumb />
					</div>

					<div class="prose text-base">
						{#if academics_category.flexible_content}
							<FlexibleContent content={academics_category.flexible_content} />
						{:else}
							<p>Page is empty.</p>
						{/if}
					</div>

					<div>
						<h1 class="mb-6 md:mb-10 text-2xl md:text-3xl leading-tight font-bold">
							{academics_category.name} Programs
						</h1>
						<div class="space-y-3">
							{#each academics_programs as program}
								{#if typeof program.category !== 'string'}
									<a href="{program.category.slug}/programs/{program.slug}" class="block">
										<HorizontalCard name={program.title}/>
									</a>
								{/if}
							{/each}
						</div>
					</div>

					<div>
						<h1 class="mb-3 md:mb-6 text-2xl md:text-3xl leading-tight font-bold">
							Other Things
						</h1>
						<div class="space-y-1">
							<LinkButton text="{academics_category.name} Courses" link="{academics_category.slug}/courses" />
							<LinkButton text="Admission Procedure" link="{academics_category.slug}/admission-procedure" />
							<LinkButton text="Academic Processes & Rules" link="{academics_category.slug}/academic-processes-and-rules" />
							<LinkButton text="Forms" link="{academics_category.slug}/forms" />
						</div>
					</div>

				</div>
			</div>
		</div>

	{:else}
		<p>Page not found</p>
	{/if}
</body>

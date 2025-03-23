<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import CoursesTable from '$lib/components/table/CoursesTable.svelte';

	export let data;
	$: ({ academics_program } = data);
</script>

<body>
	{#if academics_program}
		<Banner title={academics_program.title} />

		<div class="flex justify-center px-4">
			<div class="w-full max-w-6xl pb-16 md:pb-24">
				<div class="space-y-12 md:space-y-16">
					<div class="pt-5">
						<Breadcrumb page_name={academics_program.title} />
					</div>

					<div class="prose text-base">
						{#if academics_program.flexible_content}
							<FlexibleContent content={academics_program.flexible_content} />
						{:else}
							<p>Page is empty.</p>
						{/if}
					</div>

					<div>
						<div class="mb-6 md:mb-10">
							<h1 class="text-2xl font-bold leading-tight md:text-3xl">Curriculum Checklist</h1>
							<p class="ml-[2px] mt-2 text-xs font-medium opacity-55">
								Last Updated: March XX, 2025
							</p>
						</div>

						{#if academics_program.curriculum_table}
							<div class="overflow-hidden rounded-lg bg-white p-4 shadow-lg">
								{#each [...new Set(academics_program.curriculum_table
											.filter((item) => typeof item !== 'number')
											.map((item) => item.year)
											.sort((a, b) => {
												if (a == null) return Number.MAX_SAFE_INTEGER;
												if (b == null) return -Number.MAX_SAFE_INTEGER;
												return a - b;
											}))] as year}
									<!-- For N/A year or semesters -->
									{#if academics_program.curriculum_table
										.filter((item) => typeof item !== 'number')
										.filter((item) => item.year === null || item.semester === null)
										.map((item) => item.academics_courses_course_code)
										.filter((item) => typeof item !== 'string')}
										<div class="px-4">
											<CoursesTable
												academics_courses={academics_program.curriculum_table
													.filter((item) => typeof item !== 'number')
													.filter((item) => item.year === null || item.semester === null)
													.map((item) => item.academics_courses_course_code)
													.filter((item) => typeof item !== 'string')}
											/>
										</div>
									{/if}

									<!-- Year Heading -->
									{#if year}
										<h2 class="mt-8 border-b pb-2 text-2xl font-bold">Year {year}</h2>
									{/if}

									{#if academics_program.curriculum_table
										.filter((item) => typeof item !== 'number')
										.filter((item) => item.year === year && item.semester === 'first')
										.map((item) => item.academics_courses_course_code)
										.filter((item) => typeof item !== 'string').length !== 0}
										<!-- First Semester -->
										<h3 class="mt-4 font-semibold">First Semester</h3>
										<div class="px-4">
											<CoursesTable
												academics_courses={academics_program.curriculum_table
													.filter((item) => typeof item !== 'number')
													.filter((item) => item.year === year && item.semester === 'first')
													.map((item) => item.academics_courses_course_code)
													.filter((item) => typeof item !== 'string')}
											/>
										</div>
									{/if}

									{#if academics_program.curriculum_table
										.filter((item) => typeof item !== 'number')
										.filter((item) => item.year === year && item.semester === 'second')
										.map((item) => item.academics_courses_course_code)
										.filter((item) => typeof item !== 'string').length !== 0}
										<!-- Second Semester -->
										<h3 class="mt-4 font-semibold">Second Semester</h3>
										<div class="px-4">
											<CoursesTable
												academics_courses={academics_program.curriculum_table
													.filter((item) => typeof item !== 'number')
													.filter((item) => item.year === year && item.semester === 'second')
													.map((item) => item.academics_courses_course_code)
													.filter((item) => typeof item !== 'string')}
											/>
										</div>
									{/if}

									{#if academics_program.curriculum_table
										.filter((item) => typeof item !== 'number')
										.filter((item) => item.year === year && item.semester === 'midyear')
										.map((item) => item.academics_courses_course_code)
										.filter((item) => typeof item !== 'string').length !== 0}
										<!-- Midyear -->
										<h3 class="mt-4 font-semibold">Midyear</h3>
										<div class="px-4">
											<CoursesTable
												academics_courses={academics_program.curriculum_table
													.filter((item) => typeof item !== 'number')
													.filter((item) => item.year === year && item.semester === 'midyear')
													.map((item) => item.academics_courses_course_code)
													.filter((item) => typeof item !== 'string')}
											/>
										</div>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p>Page not found</p>
	{/if}
</body>

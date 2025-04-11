<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import CoursesTable from '$lib/components/table/CoursesTable.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import { error } from '@sveltejs/kit';

	export let data;
	$: ({ academics_program } = data);
</script>

{#if academics_program}
	<FullWidthBreakout>
		<Banner title={academics_program.title} />
	</FullWidthBreakout>

	<div class="pb-16 md:pb-24">
		<div class="pb-8 pt-2 md:py-8">
			<Breadcrumb page_name={academics_program.title} />
		</div>

		<div class="space-y-16 md:space-y-24">
			<div class="text-base">
				{#if academics_program.flexible_content}
					<FlexibleContent content={academics_program.flexible_content} />
				{:else}
					<p>Page is empty.</p>
				{/if}
			</div>

			<div>
				<div class="mb-6 md:mb-10">
					<h1 class="text-2xl font-bold leading-tight md:text-3xl">Curriculum Checklist</h1>
					<p class="ml-[2px] mt-2 text-xs font-medium opacity-55">Last Updated: March XX, 2025</p>
				</div>

				{#if academics_program.curriculum_table}
					<div class="overflow-hidden rounded-lg bg-white p-4 shadow-lg">
						{#each [...new Set(academics_program.curriculum_table
									.filter((item) => typeof item !== 'number')
									.filter((item) => item.year !== null)
									.map((item) => item.year)
									.sort((a, b) => {
										if (a && b) return a - b;
										return error(500);
									}))] as year}
							<!-- For N/A year or semesters -->
							{#if academics_program.curriculum_table
								.filter((item) => typeof item !== 'number')
								.filter((item) => !item.year && !item.semester)
								.map((item) => item.academics_courses_course_code)
								.filter((item) => typeof item !== 'string')}
								<div class="px-4">
									<CoursesTable
										academics_courses={academics_program.curriculum_table
											.filter((item) => typeof item !== 'number')
											.filter((item) => !item.year && !item.semester)
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
								.filter((item) => item.year && item.semester && item.year === year && item.semester === 'first')
								.map((item) => item.academics_courses_course_code)
								.filter((item) => typeof item !== 'string').length !== 0}
								<!-- First Semester -->
								<h3 class="mt-4 font-semibold">First Semester</h3>
								<div class="px-4">
									<CoursesTable
										academics_courses={academics_program.curriculum_table
											.filter((item) => typeof item !== 'number')
											.filter(
												(item) =>
													item.year &&
													item.semester &&
													item.year === year &&
													item.semester === 'first'
											)
											.map((item) => item.academics_courses_course_code)
											.filter((item) => typeof item !== 'string')}
									/>
								</div>
							{/if}

							{#if academics_program.curriculum_table
								.filter((item) => typeof item !== 'number')
								.filter((item) => item.year && item.semester && item.year === year && item.semester === 'second')
								.map((item) => item.academics_courses_course_code)
								.filter((item) => typeof item !== 'string').length !== 0}
								<h3 class="mt-4 font-semibold">Second Semester</h3>
								<div class="px-4">
									<CoursesTable
										academics_courses={academics_program.curriculum_table
											.filter((item) => typeof item !== 'number')
											.filter(
												(item) =>
													item.year &&
													item.semester &&
													item.year === year &&
													item.semester === 'second'
											)
											.map((item) => item.academics_courses_course_code)
											.filter((item) => typeof item !== 'string')}
									/>
								</div>
							{/if}

							{#if academics_program.curriculum_table
								.filter((item) => typeof item !== 'number')
								.filter((item) => item.year && item.semester && item.year === year && item.semester === 'midyear')
								.map((item) => item.academics_courses_course_code)
								.filter((item) => typeof item !== 'string').length !== 0}
								<!-- Midyear -->
								<h3 class="mt-4 font-semibold">Midyear</h3>
								<div class="px-4">
									<CoursesTable
										academics_courses={academics_program.curriculum_table
											.filter((item) => typeof item !== 'number')
											.filter(
												(item) =>
													item.year &&
													item.semester &&
													item.year === year &&
													item.semester === 'midyear'
											)
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
{:else}
	<p>Page not found</p>
{/if}

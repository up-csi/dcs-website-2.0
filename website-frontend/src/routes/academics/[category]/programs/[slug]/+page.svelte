<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import CoursesTable from '$lib/components/table/CoursesTable.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import { error } from '@sveltejs/kit';

	export let data;

	$: ({ academics_program } = data);

	$: curriculum_last_updated = new Date(
		academics_program.curriculum_last_updated ?? 0
	).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	$: sorted_years = [
		...new Set(
			academics_program.curriculum_table
				?.filter((item) => typeof item !== 'number')
				.filter((item) => item.year !== null)
				.map((item) => item.year)
				.sort((a, b) => {
					if (a && b) return a - b;
					return error(500);
				})
		)
	];

	$: null_semester_curriculum_table =
		academics_program.curriculum_table
			?.filter((item) => typeof item !== 'number')
			.filter((item) => !item.year && !item.semester)
			.map((item) => item.academics_courses_course_code ?? '')
			.filter((item) => typeof item !== 'string') ?? [];

	function first_semester_curriculum_table(year: number | null) {
		return (
			academics_program.curriculum_table
				?.filter((item) => typeof item !== 'number')
				.filter(
					(item) => item.year && item.semester && item.year === year && item.semester === 'first'
				)
				.map((item) => item.academics_courses_course_code ?? '')
				.filter((item) => typeof item !== 'string') ?? []
		);
	}

	function second_semester_curriculum_table(year: number | null) {
		return (
			academics_program.curriculum_table
				?.filter((item) => typeof item !== 'number')
				.filter(
					(item) => item.year && item.semester && item.year === year && item.semester === 'second'
				)
				.map((item) => item.academics_courses_course_code ?? '')
				.filter((item) => typeof item !== 'string') ?? []
		);
	}

	function midyear_semester_curriculum_table(year: number | null) {
		return (
			academics_program.curriculum_table
				?.filter((item) => typeof item !== 'number')
				.filter(
					(item) => item.year && item.semester && item.year === year && item.semester === 'midyear'
				)
				.map((item) => item.academics_courses_course_code ?? '')
				.filter((item) => typeof item !== 'string') ?? []
		);
	}
</script>

{#if academics_program}
	<FullWidthBreakout>
		<Banner
			title={academics_program.title ?? ''}
			background_image={academics_program.background_image ?? ''}
		/>
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
					<p class="ml-[2px] mt-2 text-xs font-medium opacity-55">
						Last Updated: {curriculum_last_updated}
					</p>
				</div>

				{#if academics_program.curriculum_table}
					<div
						class="flex flex-col gap-y-10 overflow-hidden rounded-lg bg-white px-5 py-10 shadow-lg"
					>
						<!-- For N/A year or semesters -->
						{#if null_semester_curriculum_table.length !== 0}
							<div class="px-4">
								<CoursesTable academics_courses={null_semester_curriculum_table} />
							</div>
						{/if}

						{#each sorted_years as year}
							<!-- Year Heading -->
							{#if year}
								<div class="flex flex-col gap-y-5">
									<h2 class="border-b text-2xl font-bold">Year {year}</h2>

									{#if first_semester_curriculum_table(year).length !== 0}
										<!-- First Semester -->
										<div class="flex flex-col gap-y-5">
											<h3 class="font-semibold">First Semester</h3>
											<div class="px-4">
												<CoursesTable academics_courses={first_semester_curriculum_table(year)} />
											</div>
										</div>
									{/if}

									{#if second_semester_curriculum_table(year).length !== 0}
										<div class="flex flex-col gap-y-5">
											<h3 class="font-semibold">Second Semester</h3>
											<div class="px-4">
												<CoursesTable academics_courses={second_semester_curriculum_table(year)} />
											</div>
										</div>
									{/if}

									{#if midyear_semester_curriculum_table(year).length !== 0}
										<!-- Midyear -->
										<div class="flex flex-col gap-y-5">
											<h3 class="font-semibold">Midyear</h3>
											<div class="px-4">
												<CoursesTable academics_courses={midyear_semester_curriculum_table(year)} />
											</div>
										</div>
									{/if}
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

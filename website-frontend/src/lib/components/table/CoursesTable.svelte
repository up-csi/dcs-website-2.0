<script lang="ts">
	import * as Table from '$lib/@shadcn-svelte/ui/table';
	import type { AcademicsCourses } from '$lib/models/academics_courses';
	import ShowMoreCourseDetails from '$lib/components/buttons/ShowMoreCourseDetails.svelte';

	export let academics_courses: AcademicsCourses;
</script>


<div class="shadow-lg">
	<Table.Root class="overflow-hidden rounded-lg">
		<Table.Header class="bg-gray-100">
			<Table.Row>
				<Table.Head
					class="w-1/12 min-w-20 bg-gray-100 px-4 py-2 text-left text-xs font-semibold text-gray-700 md:min-w-28 md:text-sm"
				>
					Code
				</Table.Head>
				<Table.Head
					class="w-3/12 bg-gray-100 px-4 py-2 text-left text-xs font-semibold text-gray-700 md:text-sm"
				>
					Title
				</Table.Head>
				<Table.Head
					class="w-7/12 bg-gray-100 px-4 py-2 text-left text-xs font-semibold text-gray-700 md:text-sm"
				>
					Description
				</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#if academics_courses.length !== 0}
				{#each academics_courses as { course_code, course_title, course_description, course_units, course_syllabus }}
					<Table.Row>
						<Table.Cell
							class="w-1/12 min-w-20 bg-white text-xs text-gray-600 md:min-w-28 md:text-sm"
						>
							{course_code}
						</Table.Cell>
						<Table.Cell class="w-3/12 bg-white text-xs text-gray-600 md:text-sm">
							{course_title}
						</Table.Cell>
						<Table.Cell class="w-7/12 bg-white text-xs text-gray-600 md:text-sm">
							{#if course_description}
								{course_description}
							{/if}
							<ShowMoreCourseDetails {course_units} {course_syllabus} />
						</Table.Cell>
					</Table.Row>
				{/each}
			{:else}
				<Table.Row>
					<Table.Cell colspan={4}
						><div class="w-full text-center italic text-gray-500">
							Nothing to show here
						</div></Table.Cell
					>
				</Table.Row>
			{/if}
		</Table.Body>
	</Table.Root>
</div>

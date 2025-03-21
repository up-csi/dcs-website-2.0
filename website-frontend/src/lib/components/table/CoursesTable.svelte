<script lang="ts">
	import * as Table from '$lib/@shadcn-svelte/ui/table';
	import type { AcademicsCourses } from '$lib/models/academics_courses';

	export let academics_courses: AcademicsCourses;
</script>

{#if academics_courses.length !== 0}
	<div class="shadow-lg">
		<Table.Root class="overflow-hidden rounded-lg">
			<Table.Header class="bg-gray-100">
				<Table.Row>
					<Table.Head
						class="w-1/12 min-w-28 bg-gray-100 px-4 py-2 text-left text-sm font-semibold text-gray-700"
					>
						Code
					</Table.Head>
					<Table.Head
						class="w-3/12 bg-gray-100 px-4 py-2 text-left text-sm font-semibold text-gray-700"
					>
						Title
					</Table.Head>
					<Table.Head
						class="w-1/12 bg-gray-100 px-4 py-2 text-left text-sm font-semibold text-gray-700"
					>
						Units
					</Table.Head>
					<Table.Head
						class="w-7/12 bg-gray-100 px-4 py-2 text-left text-sm font-semibold text-gray-700"
					>
						Description
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each academics_courses as { course_code, course_title, course_description, course_units }}
					<Table.Row>
						<Table.Cell class="w-1/12 min-w-28 bg-white text-gray-600">
							{course_code}
						</Table.Cell>
						<Table.Cell class="w-3/12 bg-white text-gray-600">
							{course_title}
						</Table.Cell>
						<Table.Cell class="w-1/12 bg-white text-gray-600">
							{course_units}
						</Table.Cell>
						<Table.Cell class="w-7/12 bg-white text-gray-600">
							{#if course_description}
								{course_description}
							{/if}
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{:else}
	<br />
	Empty
	<br />
{/if}

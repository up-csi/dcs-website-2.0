<script lang="ts">
	import { Button } from '$lib/@shadcn-svelte/ui/button/index.js';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	export let course_units;
	export let course_syllabus;
	let isDetailsHidden: boolean = true;
</script>

<Button
	on:click={() => {
		isDetailsHidden = !isDetailsHidden;
	}}
	class="h-5 w-28 align-middle text-xs"
	><div class="flex items-center gap-x-1">
		{#if isDetailsHidden}
			<ChevronDown class="size-4" /><span>Show More</span>
		{:else}
			<ChevronUp class="size-4" /><span>Show Less</span>
		{/if}
	</div></Button
>

{#if !isDetailsHidden}
	<small class="mt-2 flex flex-col text-xs">
		<p>Units: {course_units}</p>
		{#if course_syllabus}
			<p class="italic text-blue-500 underline">
				<a href={course_syllabus} target="_blank">Syllabus</a>
			</p>
		{/if}
	</small>
{/if}

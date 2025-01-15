<script lang="ts">
	/** @type {import('./$types').PageData} */
	import type { FilterControls } from '$lib/components/filter/filter_controls';
	import Banner from '$lib/components/people/Banner.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import LoadMore from '$lib/components/load_more/LoadMore.svelte';
	import PeopleCard from '$lib/components/people/PeopleCard.svelte';

	export let data;
	const { people, people_overview } = data;

	const inc = 12;
	let shown = inc;
	$: peopleList = people?.slice(0, shown);

	let controls: FilterControls = [];
</script>

<body>
	<div class="relative z-0">
		<Banner
			title="People"
			background_image={people_overview.background_image ?? ''}
			flexible_content={people_overview.flexible_content}
		/>
	</div>

	<div class="relative z-10 -mt-7">
		<FilterBar {controls} />
	</div>
	<div
		class="mx-auto my-3 grid
        max-w-[94vw] grid-cols-2 gap-2 pb-20
        md:my-8 md:max-w-[80vw] md:grid-cols-4 md:gap-4"
	>
		{#each peopleList as person}
			<a href="/people/{person.category}/{person.username}">
				<PeopleCard {person} />
			</a>
		{/each}
	</div>
	{#if shown < people.length}
		<div class="flex items-center justify-center">
			<LoadMore {inc} bind:shown />
		</div>
	{/if}
</body>

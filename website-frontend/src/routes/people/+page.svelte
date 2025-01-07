<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/people/Banner.svelte';
	import FilterControls from '$lib/components/people/FilterControls.svelte';
	import PeopleCard from '$lib/components/people/PeopleCard.svelte';

	export let data;
	const { people, people_overview } = data;

	let shown = 12;
	function load_more() {
		shown += 12;
	}
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
		<FilterControls />
	</div>
	<div
		class="mx-auto my-3 grid
        max-w-[94vw] grid-cols-2 gap-2 pb-20
        md:my-8 md:max-w-[80vw] md:grid-cols-4 md:gap-4"
	>
		{#each people.slice(0, shown) as person}
			<a href="/people/{person.category}/{person.username}">
				<PeopleCard {person} />
			</a>
		{/each}
	</div>
	{#if people.length > 12 && shown < people.length}
		<button class="text-gray-900" on:click={load_more}> Load More </button>
	{/if}
</body>

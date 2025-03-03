<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import LoadMore from '$lib/components/buttons/LoadMore.svelte';
	import PeopleCard from '$lib/components/people/PeopleCard.svelte';

	export let data;

	$: ({ category, people, position_filters, laboratory_filters } = data);

	const inc = 12;
	let shown = inc;
	$: peopleList = people?.slice(0, shown);

	$: controls = [
		{
			name: 'position',
			categories: position_filters
		},
		{
			name: 'laboratory',
			categories: laboratory_filters
		}
	];
</script>

<body>
	{#if category}
		<div class="relative z-0">
			<Banner
				title={category.title}
				background_image={category.background_image ?? ''}
				flexible_content={category.flexible_content}
			/>
		</div>

		<div class="relative z-10 -mt-7">
			<FilterBar {controls} />
		</div>

		<CardPanel>
			{#each peopleList as person}
				<a href="/people/{category.title}/{person.username}">
					<PeopleCard {person} laboratory={person.affiliations?.[0]?.laboratories_id?.name} />
				</a>
			{/each}
			{#if shown < people.length}
				<div class="col-span-full mt-8 flex items-center justify-center">
					<LoadMore {inc} bind:shown />
				</div>
			{/if}
		</CardPanel>
	{:else}
		<p>People category not found</p>
	{/if}
</body>

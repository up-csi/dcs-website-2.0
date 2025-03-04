<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import LoadMore from '$lib/components/buttons/LoadMore.svelte';
	import PeopleCard from '$lib/components/cards/PeopleCard.svelte';
	export let data;

	$: ({ people, people_overview, position_filters, laboratory_filters } = data);

	const inc = 12;
	let shown = inc;

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

	$: peopleList = people?.slice(0, shown);
</script>

<body>
	<div class="relative z-0">
		<Banner
			title="People"
			background_image={people_overview.background_image ?? ''}
			flexible_content={people_overview.flexible_content}
		/>
	</div>


	<div class="md:px-32">

		<div>
			<div class="flex space-x-2 pt-5 pb-2 text-xs font-medium">
				<a class="" href="/">Home</a>
				<p class="opacity-55">/</p>
				<p class="opacity-55">People</p>
			</div>
			<div class="h-[1px] w-full bg-primary opacity-20"></div>
		</div>

		<p class="text-3xl font-bold">Regular Faculty</p>
		<p class="text-3xl font-bold">Lecturers & Teaching Associates</p>
		<p class="text-3xl font-bold">Support Staff</p>


		<CardPanel>
			{#each peopleList as person}
				<a href="/people/{person.category}/{person.username}">
					<PeopleCard {person} laboratory={person.affiliations?.[0]?.laboratories_id?.name} />
				</a>
			{/each}
			{#if shown < people.length}
				<div class="col-span-full mt-8 flex items-center justify-center">
					<LoadMore {inc} bind:shown />
				</div>
			{/if}
		</CardPanel>
	</div>
</body>

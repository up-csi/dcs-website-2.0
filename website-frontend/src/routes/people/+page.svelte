<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import PeopleCard from '$lib/components/cards/PeopleCard.svelte';
	import { Person } from '$lib/models/people';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import FullWidthBreakout from '$lib/components/FullWidthBreakout.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	export let data;

	$: ({ people, people_overview, position_filters, laboratory_filters, level_filters } = data);

	const priority = [
		'Professor Emeritus',
		'Professor Emerita',
		'Department Chair',
		'Professor',
		'Associate Professor',
		'Assistant Professor',
		'Instructor',
		'Professorial Lecturer',
		'Senior Lecturer',
		'Lecturer',
		'Teaching Fellow',
		'Teaching Assistant',
		'Researcher',
		'Administrative Staff'
	];

	$: positions = Array.from(
		new Set(people.map((person: Person) => person.position).filter(Boolean))
	)
		.map((pos) => pos as string)
		.sort((a, b) => {
			const indexA = priority.indexOf(a);
			const indexB = priority.indexOf(b);

			// If both positions are in the priority list, sort by their order
			if (indexA !== -1 && indexB !== -1) {
				return indexA - indexB;
			}
			// If only one is in the priority list, prioritize it
			if (indexA !== -1) return -1;
			if (indexB !== -1) return 1;

			// Otherwise, sort alphabetically
			return a.localeCompare(b);
		});

	$: peopleByPosition = positions.map((position) => ({
		position,
		people: people.filter((person: Person) => person.position === position)
	}));

	$: controls = [
		{
			name: 'position',
			categories: position_filters
		},
		{
			name: 'laboratory',
			categories: laboratory_filters
		},
		{
			name: 'level',
			categories: level_filters
		}
	];
</script>

<FullWidthBreakout>
	<Banner
		title="People"
		background_image={people_overview.background_image ?? ''}
		flexible_content={people_overview.flexible_content}
	/>
</FullWidthBreakout>

<div class="pb-16 md:pb-24">
	<div class="py-2 pb-8 md:py-8">
		<Breadcrumb />
	</div>

	<FilterBar {controls} />

	<div class="mt-5 space-y-16">
		{#if peopleByPosition.length === 0 || peopleByPosition.every(({ people }) => people.length === 0)}
			<div class="pt-16 text-center md:pt-24">
				<p class="text-sm italic text-slate-600 md:text-lg">
					No people found matching the selected filters.
				</p>
			</div>
		{:else}
			{#each peopleByPosition as { position, people }}
				{#if people.length > 0}
					<div class="pt-8">
						<p class="heading-text heading-padding">
							{#if position === 'Professor Emeritus'}
								{#if people.length === 1}
									Professor Emeritus
								{:else}
									Professors Emeriti
								{/if}
							{:else if position === 'Professor Emerita'}
								{#if people.length === 1}
									Professor Emerita
								{:else}
									Professors Emeritae
								{/if}
							{:else}
								{position}{people.length > 1 ? 's' : ''}
							{/if}
						</p>
						<CardPanel>
							{#each people as person (person.username)}
								<a
									href="/people/{person.username}"
									class="-m-5 grow-0 basis-full p-5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
								>
									<PeopleCard
										item={person}
										laboratory={person.affiliations?.[0]?.laboratories_id?.name}
									/>
								</a>
							{/each}
						</CardPanel>
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>

<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import PeopleCard from '$lib/components/cards/PeopleCard.svelte';
	import { Person } from '$lib/models/people';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	export let data;

	$: ({ people, people_overview } = data);

	const priority = [
	    "Professor", 
	    "Associate Professor", 
	    "Assistant Professor", 
	    "Instructor", 
	    "Lecturer", 
	    "Researcher"
	];

	$: positions = Array.from(
	    new Set(people.map((person: Person) => person.position).filter(Boolean))
	).map(pos => pos as string).sort((a, b) => {
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
</script>

<body>
	<Banner
		title="People"
		background_image={people_overview.background_image ?? ''}
		flexible_content={people_overview.flexible_content}
	/>

	<div class="flex justify-center px-4">
		<div class="content-padding">
			<div class="pt-5">
				<Breadcrumb />
			</div>

			{#each peopleByPosition as { position, people }}
				<div>
					<p class="heading-text">{position}s</p>
					<CardPanel>
						{#each people as person (person.username)}
							<a href="/people/{person.category}/{person.username}">
								<PeopleCard {person} laboratory={person.affiliations?.[0]?.laboratories_id?.name} />
							</a>
						{/each}
					</CardPanel>
				</div>
			{/each}
		</div>
	</div>
</body>

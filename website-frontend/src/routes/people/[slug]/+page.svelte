<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import PeopleCard from '$lib/components/cards/PeopleCard.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import { Person } from '$lib/models/people';

	export let data;

	$: ({ category, people } = data);

	$: positions = Array.from(
		new Set(people.map((person: Person) => person.position).filter(Boolean))
	);
	$: peopleByPosition = positions.map((position) => ({
		position,
		people: people.filter((person: Person) => person.position === position)
	}));
</script>

<body>
	{#if category}
		<Banner
			title={category.title}
			background_image={category.background_image ?? ''}
			flexible_content={category.flexible_content}
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
									<PeopleCard
										{person}
										laboratory={person.affiliations?.[0]?.laboratories_id?.name}
									/>
								</a>
							{/each}
						</CardPanel>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<p>People category not found</p>
	{/if}
</body>

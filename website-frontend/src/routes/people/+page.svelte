<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import PeopleCard from '$lib/components/cards/PeopleCard.svelte';
	import { Person } from '$lib/models/people';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	export let data;

	$: ({ people, people_overview } = data);

	$: regularList = people?.filter((person: Person) => person.category === 'regular-faculty') ?? [];
	$: lecturerList =
		people?.filter((person: Person) => person.category === 'lecturers-and-teaching-associates') ??
		[];
	$: supportList = people?.filter((person: Person) => person.category === 'support-staff') ?? [];

	let heading = `text-2xl md:text-3xl font-bold inline-block pb-3 md:pb-4 leading-none`;
</script>

<body>
	<div class="relative z-0">
		<Banner
			title="People"
			background_image={people_overview.background_image ?? ''}
			flexible_content={people_overview.flexible_content}
		/>
	</div>

	<div class="mx-auto w-[94vw] md:w-[80vw]">
		<div class="mt-5">
			<Breadcrumb />
		</div>

		<div class="space-y-4 py-8 md:py-10">
			{#if regularList.length > 0}
				<a class={heading} href="/people/regular-faculty">Regular Faculty</a>
				<CardPanel>
					{#each regularList as person}
						<a href="/people/{person.category}/{person.username}">
							<PeopleCard {person} laboratory={person.affiliations?.[0]?.laboratories_id?.name} />
						</a>
					{/each}
				</CardPanel>
			{/if}
			{#if lecturerList.length > 0}
				<a class={heading} href="/people/lecturers-and-teaching-associates"
					>Lecturers & Teaching Associates</a
				>
				<CardPanel>
					{#each lecturerList as person}
						<a href="/people/{person.category}/{person.username}">
							<PeopleCard {person} laboratory={person.affiliations?.[0]?.laboratories_id?.name} />
						</a>
					{/each}
				</CardPanel>
			{/if}
			{#if supportList.length > 0}
				<a class={heading} href="/people/support-staff">Support Staff</a>
				<CardPanel>
					{#each supportList as person}
						<a href="/people/{person.category}/{person.username}">
							<PeopleCard {person} laboratory={person.affiliations?.[0]?.laboratories_id?.name} />
						</a>
					{/each}
				</CardPanel>
			{/if}
		</div>
	</div>
</body>

<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import PeopleCard from '$lib/components/cards/PeopleCard.svelte';
	import { Person } from '$lib/models/people';
	export let data;

	$: ({ people, people_overview } = data);

	$: regularList = people?.filter((person: Person) => person.category === "regular-faculty") ?? [];
	$: lecturerList = people?.filter((person: Person) => person.category === "lecturers-and-teaching-associates") ?? [];
	$: supportList = people?.filter((person: Person) => person.category === "support-staff") ?? [];
</script>

<body>
	<div class="relative z-0">
		<Banner
			title="People"
			background_image={people_overview.background_image ?? ''}
			flexible_content={people_overview.flexible_content}
		/>
	</div>

 
	<div class="w-[94vw] md:w-[80vw] mx-auto">

		<div>
			<div class="flex space-x-2 pt-5 pb-2 text-xs font-medium">
				<a class="" href="/">Home</a>
				<p class="opacity-55">/</p>
				<p class="opacity-55">People</p>
			</div>
			<div class="h-[1px] w-full bg-primary opacity-20"></div>
		</div>

		<div class="space-y-4 py-8 md:py-10">
			{#if regularList.length > 0}
				<a class="text-2xl md:text-3xl font-bold inline-block pb-3 md:pb-4 leading-none" href="/people/regular-faculty">Regular Faculty</a>
				<CardPanel>
					{#each regularList as person}
						<a href="/people/{person.category}/{person.username}">
							<PeopleCard {person} laboratory={person.affiliations?.[0]?.laboratories_id?.name} />
						</a>
					{/each}
				</CardPanel>
			{/if}
			{#if lecturerList.length > 0}
				<a class="text-2xl md:text-3xl font-bold inline-block pb-3 md:pb-4 leading-none" href="/people/lecturers-and-teaching-associates">Lecturers & Teaching Associates</a>
				<CardPanel>
					{#each lecturerList as person}
						<a href="/people/{person.category}/{person.username}">
							<PeopleCard {person} laboratory={person.affiliations?.[0]?.laboratories_id?.name} />
						</a>
					{/each}
				</CardPanel>
			{/if}
			{#if supportList.length > 0}
				<a class="text-2xl md:text-3xl font-bold inline-block pb-3 md:pb-4 leading-none" href="/people/support-staff">Support Staff</a>
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

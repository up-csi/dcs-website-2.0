<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import PeopleCard from '$lib/components/cards/PeopleCard.svelte';
	import { deslugify } from '$lib/utils';

	export let data;

	$: ({ category, people } = data);
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

		<div class="mx-auto w-[94vw] md:w-[80vw]">
			<div>
				<div class="flex space-x-2 pb-2 pt-5 text-xs font-medium">
					<a class="" href="/">Home</a>
					<p class="opacity-55">/</p>
					<a class="" href="/people">People</a>
					<p class="opacity-55">/</p>
					<p class="opacity-55">{deslugify(category.title)}</p>
				</div>
				<div class="h-[1px] w-full bg-primary opacity-20"></div>
			</div>

			<CardPanel>
				{#each people as person}
					<a href="/people/{category.title}/{person.username}">
						<PeopleCard {person} laboratory={person.affiliations?.[0]?.laboratories_id?.name} />
					</a>
				{/each}
			</CardPanel>
		</div>
	{:else}
		<p>People category not found</p>
	{/if}
</body>

<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import PeopleCard from '$lib/components/cards/PeopleCard.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
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
			<div class="mt-5">
				<Breadcrumb />
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

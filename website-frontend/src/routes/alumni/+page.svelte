<script lang="ts">
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import CardPanel from '$lib/components/panel/CardPanel.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import AlumCard from '$lib/components/cards/AlumCard.svelte';

	export let data;
	$: ({ alumni_overview, alumni } = data);

	const title = 'Alumni';
</script>

<body>
	<Banner {title} background_image={alumni_overview.background_image} />
	<div class="mx-20">
		<div class="my-5">
			<Breadcrumb />
		</div>

		{#if alumni_overview.flexible_content}
			<div class="mb-10 w-full px-40">
				<FlexibleContent content={alumni_overview.flexible_content} />
			</div>
		{/if}

		<p class="text-2xl font-bold">Notable Alumni</p>
		<CardPanel>
			{#each alumni as alum}
				<AlumCard {alum} />
			{/each}
		</CardPanel>
	</div>
</body>

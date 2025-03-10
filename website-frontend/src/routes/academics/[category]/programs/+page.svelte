<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import HorizontalCard from '$lib/components/cards/HorizontalCard.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';

	export let data;
	$: ({ academics_category, academics_programs } = data);
</script>

<body>
	{#if academics_category}
		<Banner title="{academics_category.name} Programs" />

		<div class="flex justify-center px-4">
			<div class="w-full max-w-6xl pb-16 md:pb-24">
				<div class="space-y-8 md:space-y-12">
					<div class="pt-5">
						<Breadcrumb />
					</div>

					<div class="space-y-3">
						{#each academics_programs as program}
							{#if typeof program.category !== 'string'}
								<a href="{program.category.slug}/programs/{program.slug}" class="block">
									<HorizontalCard name={program.title} />
								</a>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p>Page not found</p>
	{/if}
</body>

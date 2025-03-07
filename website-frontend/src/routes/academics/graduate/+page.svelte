<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import HorizontalCard from '$lib/components/cards/HorizontalCard.svelte';

	export let data;
	$: ({ academics, academics_programs, academics_courses } = data);
</script>

<body>
	{#if academics}
		<Banner title="Graduate" />

		<div class="px-4 md:px-32">
			<div>
				<div class="flex space-x-2 pb-2 pt-5 text-xs font-medium">
					<a class="" href="/">Home</a>
					<p class="opacity-55">/</p>
					<a class="" href="/academics">Academics</a>
					<p class="opacity-55">/</p>
					<p class="opacity-55">Graduate</p>
				</div>
				<div class="h-[1px] w-full bg-primary opacity-20"></div>
			</div>

			<div class="prose pt-10 text-base">
				{#if academics.flexible_content}
					<FlexibleContent content={academics.flexible_content} />
				{:else}
					<p>Page is empty.</p>
				{/if}
			</div>

			<h1 class="mt-10 mb-8 text-3xl font-bold">
				Graduate Programs
			</h1>

			<div class="space-y-3">
				{#each academics_programs as program}
					{#if typeof program.category !== 'string' && program.category.slug == 'graduate'}
						<a href="academics/{program.category.slug}/programs/{program.slug}" class="block">
							<HorizontalCard name={program.title}/>
						</a>
					{/if}
				{/each}
			</div>

			<h1 class="mt-14 mb-8 text-3xl font-bold">
				Admission Procedure
			</h1>

			<h1 class="mt-14 mb-8 text-3xl font-bold">
				Forms
			</h1>
		</div>

	{:else}
		<p>Page not found</p>
	{/if}
</body>

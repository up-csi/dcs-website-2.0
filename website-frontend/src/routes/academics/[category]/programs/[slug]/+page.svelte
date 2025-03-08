<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import DataTable from '$lib/components/table/DataTable.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';

	export let data;
	$: ({ academics_program } = data);
</script>

<body>
	{#if academics_program}
		<Banner title={academics_program.title} />

		<div class="container mx-auto my-8 mb-5">
			<Breadcrumb page_name={academics_program.title} />
		</div>

		<div class="container mx-auto my-8 mb-5">
			<Breadcrumb page_name={academics_program.title} />
		</div>

		<div class="flex justify-center px-4">
			<div class="pb-16 md:pb-24 max-w-6xl w-full">
				<div class="space-y-12 md:space-y-16">

					<div>
						<div class="flex space-x-2 pb-2 pt-5 text-xs font-medium">
							<a class="" href="/">Home</a>
							<p class="opacity-55">/</p>
							<a class="" href="/academics">Academics</a>
							<p class="opacity-55">/</p>
							<p class="">idk :P</p>
							<p class="opacity-55">/</p>
							<p class="opacity-55">{academics_program.title}</p>
						</div>
						<div class="h-[1px] w-full bg-primary opacity-20"></div>
					</div>

					<div class="prose text-base">
						{#if academics_program.flexible_content}
							<FlexibleContent content={academics_program.flexible_content} />
						{:else}
							<p>Page is empty.</p>
						{/if}
					</div>

					<div>
						<div class="mb-6 md:mb-10">
							<h1 class="text-2xl md:text-3xl leading-tight font-bold"> Curriculum Checklist </h1>
							<p class="mt-2 ml-[2px] text-xs font-medium opacity-55"> Last Updated: March XX, 2025 </p>
						</div>
						
						{#if academics_program.curriculum_table}
							<div class="bg-white shadow-lg rounded-lg overflow-hidden p-4">
								{#each [...new Set(academics_program.curriculum_table
									.filter((item) => typeof item !== 'number')
									.map((item) => item.year)
									.sort((a, b) => a - b))] as year}
								
									<!-- Year Heading -->
									<h2 class="text-2xl font-bold mt-8 border-b pb-2">Year {year}</h2>
								
									<!-- First Semester -->
									<h3 class="font-semibold mt-4">First Semester</h3>
									<div class="px-4">
										<DataTable
											data={academics_program.curriculum_table
												.filter((item) => typeof item !== 'number')
												.filter((item) => item.year === year && item.semester === 'first')}
										/>
									</div>
								
									<!-- Second Semester -->
									<h3 class="font-semibold mt-4">Second Semester</h3>
									<div class="px-4">
										<DataTable
											data={academics_program.curriculum_table
												.filter((item) => typeof item !== 'number')
												.filter((item) => item.year === year && item.semester === 'second')}
										/>
									</div>
								
									<!-- Midyear -->
									<h3 class="font-semibold mt-4">Midyear</h3>
									<div class="px-4">
										<DataTable
											data={academics_program.curriculum_table
												.filter((item) => typeof item !== 'number')
												.filter((item) => item.year === year && item.semester === 'midyear')}
										/>
									</div>
								{/each}								
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p>Page not found</p>
	{/if}
</body>

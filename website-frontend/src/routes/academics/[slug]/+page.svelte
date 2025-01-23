<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banner/Banner.svelte';
	export let data;
</script>

<body class="bg-gray-100">
	{#if data.program}
		<Banner title={data.program.title} background_image={data.program.image} />

		<div class="px-4 py-10 text-base text-[#01152B] md:px-32">
			{@html data.program.description}

			<div class="my-10 max-w-6xl overflow-hidden rounded-md bg-white shadow-lg">
				<div class="px-4 py-8 md:px-6">
					<div class="mb-8 text-xl font-bold">Curriculum</div>

					<p class="text-sm text-gray-500">Core Courses</p>
					<p class="text-base">
						{@html data.program.curriculum}
					</p>
				</div>
			</div>
		</div>
	{:else}
		<p>Program not found</p>
	{/if}
</body>

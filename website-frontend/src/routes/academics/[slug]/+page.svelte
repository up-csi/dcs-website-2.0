<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<body class="bg-gray-100">
	{#if data.program}
		<div class="relative">
			<div
				class="h-[40vh] bg-cover bg-center md:h-[50vh]"
				style="background-image: linear-gradient(to top, hsl(var(--primary)), transparent), url('{data
					.program.image}')"
			></div>

			<div class="absolute bottom-9">
				<h1
					class="px-4 text-3xl font-bold text-primary-foreground md:max-w-[60vw] md:px-32 md:text-5xl"
				>
					{data.program.title}
				</h1>
			</div>
		</div>

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

<script>
	// @ts-nocheck
	import { deslugify } from '$lib/utils';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let data;
	const { category, people } = data;
	let shown = 12;

	function load_more() {
		shown += 12;
	}

	const deslugify_title = deslugify(category.title);
</script>

<body>
	{#if category}
		<div class="relative">
			<div
				class="h-[45vh] bg-cover bg-center md:h-[60vh]"
				style="background-image: linear-gradient(to top, #004420, transparent), url('{category.image}')"
			></div>

			<div
				class="absolute bottom-24 left-1/2 -translate-x-1/2 transform text-center text-white md:left-0 md:max-w-[60vw] md:translate-x-0 md:px-32 md:text-start"
			>
				<h1 class="text-3xl font-bold md:mb-4 md:text-4xl">{deslugify_title}</h1>
				<h4 class="hidden text-gray-300 md:block">{@html category.flexible_content}</h4>
			</div>
		</div>

		<!-- category search box -->
		<div
			class="relative mx-auto -mt-7 flex h-full max-w-[94vw] rounded-lg bg-white p-6 shadow-lg md:max-w-[82vw]"
		>
			<div class="text-xs font-semibold uppercase text-gray-500">
				<p>FILTER BY</p>
			</div>
		</div>

		<div
			class="mx-auto my-3 grid max-w-[94vw] grid-cols-1 gap-2 pb-20 md:my-8 md:max-w-[80vw] md:grid-cols-4 md:gap-4"
		>
			{#each people.slice(0, shown) as person}
				<a href="/people/{category.title}/{person.id}">
					<div
						class="relative flex h-full flex-col overflow-hidden rounded-lg bg-white py-2 shadow-xl"
					>
						<!-- replace by background image -->
						<div class="inset-0 hidden h-44 rounded-t-lg bg-gray-300 md:block"></div>

						<div class="z-10 flex items-center md:-mt-24 md:block md:px-3">
							<div class="photo-wrapper p-2 md:bottom-9">
								<img
									class="mx-auto h-28 w-28 rounded-full border-4 border-gray-200 md:h-32 md:w-32"
									src="{PUBLIC_APIURL}/assets/{person.profile_image}"
									alt="Profile"
								/>
							</div>

							<div class="p-3 md:mb-3 md:mt-2 md:text-center">
								<div class="text-xs font-semibold uppercase leading-tight text-gray-500">
									<p>{person.position}</p>
								</div>
								<h3 class="text-xl font-bold text-gray-900 md:py-3 md:leading-tight">
									{person.first_name}
									{person.last_name}
								</h3>
								<div class="flex max-w-[55vw] items-center justify-center text-xs text-gray-500">
									<!-- add logo to lab affiliation -->
									<img src="/path/to/lab_logo.png" alt="Logo" class="mr-2 h-3 w-3" />
									<p class="w-full truncate">Computer Vision and Machine Intelligence Group</p>
								</div>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>

		{#if people.length > 12 && shown < people.length}
			<button class="text-gray-900" on:click={load_more}> Load More </button>
		{/if}
	{:else}
		<p>People category not found</p>
	{/if}
</body>

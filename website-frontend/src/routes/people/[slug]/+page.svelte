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

			<div class="absolute bottom-24 md:max-w-[60vw] md:px-32 text-white md:left-0 md:translate-x-0 left-1/2 transform -translate-x-1/2 text-center md:text-start">
				<h1 class="text-3xl font-bold md:text-4xl md:mb-4">{deslugify_title}</h1>
				<h4 class="hidden text-gray-300 md:block">{@html category.flexible_content}</h4>
			</div>
		</div>

		<!-- category search box -->
		<div class="-mt-7 mx-auto max-w-[94vw] md:max-w-[82vw] flex h-full rounded-lg bg-white p-6 shadow-lg relative">
			<div class="text-xs font-semibold text-gray-500 uppercase">
				<p>FILTER BY</p>
			</div>
		</div>

		<div
			class="mx-auto pb-20 md:my-8 my-3 grid max-w-[94vw] grid-cols-1 gap-2 md:max-w-[80vw] md:grid-cols-4 md:gap-4"
		>
			{#each people.slice(0, shown) as person}
				<a href="/people/{category.title}/{person.id}" class="max-w-sm">
					<div class="flex h-full flex-col rounded-lg bg-white py-2 shadow-xl relative overflow-hidden">
						
						<!-- replace by background image -->
						<div class="hidden md:block inset-0 h-44 rounded-t-lg bg-gray-300"></div>

						<div class="z-10 md:-mt-24 md:px-3 md:block flex items-center">

							<div class="md:bottom-9 photo-wrapper p-2">
								<img
								  class="mx-auto md:h-32 md:w-32 h-28 w-28 rounded-full border-4 border-gray-200"
								  src="{PUBLIC_APIURL}/assets/{person.profile_image}"
								  alt="Profile"
								/>
							</div>

							<div class="p-3 md:text-center md:mt-2 md:mb-3">
								<div class="text-xs font-semibold text-gray-500 leading-tight uppercase">
									<p>{person.position}</p>
								</div>
								<h3 class="md:py-3 text-xl font-bold text-gray-900 md:leading-tight">
									{person.first_name}
									{person.last_name}
								</h3>
								<div class="text-xs text-gray-500 flex items-center justify-center max-w-[55vw]">
									<!-- add logo to lab affiliation -->
									<img src="/path/to/lab_logo.png" alt="Logo" class="h-3 w-3 mr-2">
									<p class="truncate w-full">Computer Vision and Machine Intelligence Group</p>
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

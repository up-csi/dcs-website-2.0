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

			<div class="absolute bottom-9 px-4 md:max-w-[60vw] md:px-32 text-white">
				<h1 class="text-3xl font-bold md:text-4xl md:mb-4">{deslugify_title}</h1>
				<h4 class="hidden text-slate-300 md:block">{@html category.flexible_content}</h4>
			</div>
		</div>

		<div
			class="mx-auto my-8 grid max-w-[90vw] grid-cols-2 gap-2 md:max-w-[80vw] md:grid-cols-4 md:gap-4"
		>
			{#each people.slice(0, shown) as person}
				<a href="/people/{category.title}/{person.id}" class="max-w-xs">
					<div class="flex h-full flex-col rounded-lg bg-white py-3 shadow-xl relative overflow-hidden">
						<!-- replace by background image -->
						<div class="inset-0 h-44 rounded-t-lg bg-gray-300"></div>

						<div class="z-10 -mt-20 px-3">
							<div class="bottom-9 photo-wrapper p-2 mb-2">
								<img
								  class="mx-auto h-32 w-32 rounded-full border-4 border-gray-200"
								  src="{PUBLIC_APIURL}/assets/{person.profile_image}"
								  alt="Profile"
								/>
							</div>
							<div class="p-2">
								<div class="text-center text-xs font-semibold text-gray-400">
									<p>{person.position}</p>
								</div>
								<h3 class="py-3 text-center text-xl font-medium text-gray-900">
									{person.first_name}
									{person.last_name}
								</h3>
								<div class="text-center text-xs font-semibold text-gray-400 flex items-center justify-center">
									<img src="/path/to/lab_logo.png" alt="Logo" class="h-4 w-4 mr-2">
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

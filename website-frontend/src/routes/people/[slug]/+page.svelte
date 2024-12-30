<script>
	// @ts-nocheck
	import { deslugify } from '$lib/utils';

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
				class="bg-cover bg-center h-[55vh] md:h-[65vh]"
				style="background-image: linear-gradient(to top, #004420, transparent), url('{category.image}')"
			></div>

			<div class="absolute bottom-9 md:max-w-[60vw] px-4 md:px-32">
				<h1 class="font-bold text-3xl md:text-5xl">{deslugify_title}</h1>
				<h4>{@html category.flexible_content}</h4>
			</div>
		</div>

		<div
			class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-[90vw] md:max-w-[80vw] mx-auto my-8"
		>
			{#each people.slice(0, shown) as person}
				<a href="/people/{category.title}/{person.id}" class="max-w-xs">
					<div class="bg-white shadow-xl rounded-lg py-3 px-3 flex flex-col h-full">
						<div class="photo-wrapper p-2">
							<img class="w-32 h-32 rounded-full mx-auto" src={person.profile_img} alt="Profile" />
						</div>
						<div class="p-2">
							<div class="text-center text-gray-400 text-xs font-semibold">
								<p>{person.position}</p>
							</div>
							<h3 class="text-center text-xl text-gray-900 font-medium py-3">
								{person.first_name} {person.last_name}
							</h3>
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

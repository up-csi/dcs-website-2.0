<script lang="ts">
    import Banner from '$lib/components/people/Banner.svelte';
    import FilterControls from '$lib/components/people/FilterControls.svelte';
	import PeopleCard from '$lib/components/people/PeopleCard.svelte';

	export let data;
	const { category, people } = data;

	let shown = 12;
	function load_more() {
		shown += 12;
	}
</script>

<body>
	{#if category}
        <Banner {category}/>

        <div class="-mt-7">
            <FilterControls />
        </div>

		<div
			class="grid mx-auto pb-20
            my-3 max-w-[94vw] grid-cols-2 gap-2 
            md:my-8 md:max-w-[80vw] md:grid-cols-4 md:gap-4"
		>
			{#each people.slice(0, shown) as person}
                <a href="/people/{category}/{person.username}">
                    <PeopleCard {person} />
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
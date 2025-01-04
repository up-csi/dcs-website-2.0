<script>
	import { PUBLIC_APIURL } from '$env/static/public';
	import { deslugify } from '$lib/utils';
	export let data;
	const { people, people_overview } = data;
</script>

<div>
	<h3 class="py-4 text-3xl font-bold">People</h3>
	<p class="py-4 text-lg">{@html people_overview.flexible_content}</p>
	<img src="{PUBLIC_APIURL}/assets/{people_overview.background_image}" alt="" class="max-w-2xl" />

	<ul>
		{#each people as person}
			<li>
				<img
					src="{PUBLIC_APIURL}/assets/{person.profile_image}"
					alt="{person.first_name} {person.last_name} profile picture "
					class="max-w-xs rounded-full"
				/>
				<a href="/people/{person.category}/{person.username}">
					<p class="text-lg font-bold">{person.first_name} {person.last_name}</p>
				</a>
				<a href="/people/{person.category}">
					<p class="text-md">{deslugify(person.category)}</p>
				</a>
				<p class="text-md">{person.position}</p>
			</li>
		{/each}
	</ul>
</div>

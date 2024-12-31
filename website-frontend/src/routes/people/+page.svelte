<script>
	import { PUBLIC_APIURL } from '$env/static/public';
	import { deslugify } from '$lib/utils';

	export let data;
	const { people } = data;
</script>

<div>
	<h3 class="text-3xl font-bold py-4">People</h3>
	<ul>
		{#each people as person}
			<li>
				<img
					src="{PUBLIC_APIURL}/assets/{person.profile_image}"
					alt="{person.first_name} {person.last_name} profile picture "
					class="max-w-xs rounded-full"
				/>
				<a href="/people/{person.category}/{person.id}">
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

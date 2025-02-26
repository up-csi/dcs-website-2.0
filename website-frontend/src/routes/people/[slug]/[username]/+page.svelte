<script>
	/** @type {import('./$types').PageData} */
	import { PUBLIC_APIURL } from '$env/static/public';
	export let data;
	const { person } = data;

	const affiliations = person.affiliations
		? person.affiliations
				.filter((affiliation) => typeof affiliation !== 'string')
				.map((affiliation) => {
					if (typeof affiliation.laboratories_id !== 'string') {
						return {
							role: affiliation.role,
							laboratory: affiliation.laboratories_id.name
						};
					}
					return null;
				})
				.filter(Boolean)
		: [];
</script>

<div>
	<h1 class="py-4 text-3xl font-bold">{person.first_name} {person.last_name}</h1>
	<p class="text-md">{person.position}</p>
	<img
		src="{PUBLIC_APIURL}/assets/{person.profile_image}"
		alt="{person.first_name} {person.last_name} profile picture"
	/>
	<p>{person.email}</p>
	<p>{person.location}</p>
	<p>{person.interests}</p>
	{#if person.educational_attainment}
		{#each person.educational_attainment as education}
			<p>
				{education.degree} from {education.institution} ({education.start_date} - {education.end_date})
			</p>
		{/each}
	{/if}
	{#if affiliations.length > 0}
		<h2 class="py-2 text-2xl font-bold">Affiliations</h2>
		<ul>
			{#each affiliations as affiliation}
				<li>{affiliation?.role} {affiliation?.laboratory}</li>
			{/each}
		</ul>
	{/if}
</div>

<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { PUBLIC_APIURL } from '$env/static/public';

	export let data;

	$: ({ organization } = data);
</script>

{#if organization}
	<div class="org-container">
		<h1>{organization.name}</h1>

		{#if organization.logo}
			<img
				src={`${PUBLIC_APIURL}/assets/${organization.logo}`}
				alt={organization.name}
				class="h-32 w-32 object-contain"
			/>
		{/if}

		{#if organization.description}
			<div class="description">
				<h2>Description</h2>
				<p>{organization.description}</p>
			</div>
		{/if}

		{#if organization.mission}
			<div class="mission">
				<h2>Mission</h2>
				<p>{organization.mission}</p>
			</div>
		{/if}

		{#if organization.email}
			<div class="contact">
				<h2>Contact</h2>
				<a href="mailto:{organization.email}">{organization.email}</a>
			</div>
		{/if}

		{#if organization.website}
			<div class="website">
				<h2>Website</h2>
				<a href={organization.website} target="_blank" rel="noopener noreferrer">
					{organization.website}
				</a>
			</div>
		{/if}

		{#if organization.founding_date}
			<div class="founding-date">
				<h2>Founded</h2>
				<p>{new Date(organization.founding_date).toLocaleDateString()}</p>
			</div>
		{/if}
	</div>
{/if}

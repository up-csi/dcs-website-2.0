<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/Banner.svelte';
	import Breadcrumb from '$lib/components/breadcrumbs/PageBreadcrumb.svelte';
	import { PUBLIC_APIURL } from '$env/static/public';
	export let data;

	$: ({ students_organizations, students_organizations_overview } = data);
</script>

<body>
	{#if students_organizations_overview}
		<Banner
			title="Organizations"
			background_image={students_organizations_overview.background_image ?? ''}
			flexible_content={students_organizations_overview.flexible_content ?? ''}
		/>
	{:else}
		<p>Page not found</p>
	{/if}

	<div class="px-4 py-10 text-base md:px-32">
		<div class="mb-5">
			<Breadcrumb />
		</div>

		{#each students_organizations as students_organization}
			<div class="flex items-start gap-6">
				{#if students_organization.logo}
					<a href="/students/organizations/{students_organization.slug}">
						<img
							src={`${PUBLIC_APIURL}/assets/${students_organization.logo}`}
							alt={students_organization.name}
							class="h-24 w-24 object-contain"
						/>
					</a>
				{/if}
				<div>
					<h2 class="text-2xl font-bold">{students_organization.name}</h2>
					{#if students_organization.description}
						<p class="mt-2">{students_organization.description}</p>
					{/if}
					<div class="mt-4 space-y-2">
						{#if students_organization.mission}
							<p><strong>Mission:</strong> {students_organization.mission}</p>
						{/if}
						{#if students_organization.founding_date}
							<p>
								<strong>Founded:</strong>
								{new Date(students_organization.founding_date).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric'
								})}
							</p>
						{/if}
						{#if students_organization.email || students_organization.website}
							<div class="flex gap-4">
								{#if students_organization.email}
									<a
										href="mailto:{students_organization.email}"
										class="text-primary hover:underline">Email</a
									>
								{/if}
								{#if students_organization.website}
									<a
										href={students_organization.website}
										target="_blank"
										rel="noopener noreferrer"
										class="text-primary hover:underline">Website</a
									>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</body>

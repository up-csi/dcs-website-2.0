<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banner/Banner.svelte';
	import FlexibleContent from '$lib/components/flexible_content/FlexibleContent.svelte';
	import { PUBLIC_APIURL } from '$env/static/public';
	export let data;

	$: ({ organizations, organizations_overview } = data);
</script>

<body>
	{#if organizations_overview}
		<div class="relative">
			<div
				class="h-[40vh] bg-cover bg-center md:h-[50vh]"
				style="background-image: linear-gradient(to top, hsl(var(--primary)), transparent)"
			></div>
			<div class="absolute bottom-9">
				<h1
					class="px-4 text-3xl font-bold text-primary-foreground md:max-w-[60vw] md:px-32 md:text-5xl"
				>
					Organizations
				</h1>
			</div>
		</div>

		<div class="px-4 py-10 text-base md:px-32">
			{#if organizations_overview.flexible_content}
				<FlexibleContent content={organizations_overview.flexible_content} />
			{:else}
				<p>Page is empty.</p>
			{/if}
		</div>
	{:else}
		<p>Page not found</p>
	{/if}

	{#each organizations as organization}
		<div class="px-4 py-10 text-base md:px-32">
			<div class="flex items-start gap-6">
				{#if organization.logo}
					<a href="/students/organizations/{organization.slug}">
						<img
							src={`${PUBLIC_APIURL}/assets/${organization.logo}`}
							alt={organization.name}
							class="h-24 w-24 object-contain"
						/>
					</a>
				{/if}
				<div>
					<h2 class="text-2xl font-bold">{organization.name}</h2>
					{#if organization.description}
						<p class="mt-2">{organization.description}</p>
					{/if}
					<div class="mt-4 space-y-2">
						{#if organization.mission}
							<p><strong>Mission:</strong> {organization.mission}</p>
						{/if}
						{#if organization.founding_date}
							<p>
								<strong>Founded:</strong>
								{new Date(organization.founding_date).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric'
								})}
							</p>
						{/if}
						{#if organization.email || organization.website}
							<div class="flex gap-4">
								{#if organization.email}
									<a href="mailto:{organization.email}" class="text-primary hover:underline"
										>Email</a
									>
								{/if}
								{#if organization.website}
									<a
										href={organization.website}
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
		</div>
	{/each}
</body>

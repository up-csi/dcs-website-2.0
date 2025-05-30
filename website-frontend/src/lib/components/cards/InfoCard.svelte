<script lang="ts">
	export let location: string = '';
	export let contact_email: string = '';
	export let founding_date: string = '';

	export let office: string = '';
	export let telephone: string = '';
	export let interests: string = '';
	export let awards: string = '';
	export let affiliations: { role: string; affiliation: string }[] = [];
	export let educational_attainment: {
		status?: string;
		degree?: string;
		institution?: string;
		start_date?: string | null;
		end_date?: string | null;
	}[] = [];

	let interestList = interests.split(',').map((i) => i.trim());
	let awardList = awards.split(',').map((j) => j.trim());
</script>

<div class="space-y-8 rounded-lg bg-background/20 p-6 md:p-10">
	{#if location}
		<div>
			<p class="text-primary-foreground/60">Location</p>
			<p class="text-primary-foreground">{location}</p>
		</div>
	{/if}

	{#if contact_email}
		<div>
			<p class="text-primary-foreground/60">Contact Email</p>
			<a class="italic text-primary-foreground" href="mailto:{contact_email}">{contact_email}</a>
		</div>
	{/if}

	{#if founding_date}
		<div>
			<p class="text-primary-foreground/60">Founded</p>
			<p class="text-primary-foreground">
				{new Date(founding_date).toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})}
			</p>
		</div>
	{/if}

	{#if office}
		<div>
			<p class="text-primary-foreground/60">Office</p>
			<p class="text-primary-foreground">{office}</p>
		</div>
	{/if}

	{#if telephone}
		<div>
			<p class="text-primary-foreground/60">Telephone/Local</p>
			<p class="text-primary-foreground">{telephone}</p>
		</div>
	{/if}

	{#if affiliations && affiliations.length > 0}
		<div>
			<p class="text-primary-foreground/60">Affiliations</p>
			<ul class="list-disc pl-5 text-primary-foreground">
				{#each affiliations as { role, affiliation }}
					<li>{role} at {affiliation}</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if educational_attainment && educational_attainment.length > 0}
		<div>
			<p class="text-primary-foreground/60">Education</p>
			<ul class="list-disc pl-5 text-primary-foreground">
				{#each educational_attainment as education}
					<li>
						{education.degree} from {education.institution}
						{education.start_date
							? ` (${new Date(education.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
							: ''}
						{education.end_date
							? ` - ${new Date(education.end_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})`
							: education.start_date
								? '- present)'
								: ''}
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if interests}
		<div>
			<p class="text-primary-foreground/60">Research Interests</p>
			<ul class="list-disc pl-5 text-primary-foreground">
				{#each interestList as interest}
					<li>{interest}</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if awards}
		<div>
			<p class="text-primary-foreground/60">Awards</p>
			<ul class="list-disc pl-5 text-primary-foreground">
				{#each awardList as award}
					<li>{award}</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

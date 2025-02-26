<script lang="ts">
	export let location: string = '';
	export let contact_email: string = '';
	export let founding_date: string = '';
	export let office: string = '';
	export let interests: string = '';
</script>

<div class="space-y-8 rounded-lg bg-background/20 p-6 md:p-10">
	{#if office}
		<div>
			<p class="text-primary-foreground/60">Office</p>
			<p class="text-primary-foreground">{office}</p>
		</div>
	{/if}

	{#if interests}
		<div>
			<p class="text-primary-foreground/60">Office</p>
			<p class="text-primary-foreground">{interests}</p>
		</div>
	{/if}

	{#if location}
		<div>
			<p class="text-primary-foreground/60">Location</p>
			<p class="text-lg text-primary-foreground">{location}</p>
		</div>
	{/if}

	{#if contact_email}
		<div>
			<p class="text-primary-foreground/60">Contact Email</p>
			<a class="text-lg text-primary-foreground" href="mailto:{contact_email}"
				>{contact_email}</a
			>
		</div>
	{/if}

	{#if founding_date}
		<div>
			<p class="text-primary-foreground/60">Founded</p>
			<p class="text-lg text-primary-foreground">
				{new Date(founding_date).toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})}
			</p>
		</div>
	{/if}
</div>

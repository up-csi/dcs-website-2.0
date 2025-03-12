<script lang="ts">
	import { Image } from 'lucide-svelte';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let organization;
	$: ({ name, logo, description, email, website, slug } = organization);
</script>

<a href="/students/organizations/{slug}" data-sveltekit-reload>
	<div
		class="my-4 flex grid justify-start gap-6 rounded-lg p-10 text-background"
		style="background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)/0.25)); grid-template-columns: 1fr auto;"
	>
		<a href={website} target="_blank">
			{#if logo}
				<div class="flex h-40 w-40 items-center justify-center">
					<img src="{PUBLIC_APIURL}/assets/{logo}" alt={name} class="max-h-40 max-w-40" />
				</div>
			{:else}
				<div class="flex h-40 w-40 items-center justify-center rounded-full bg-secondary">
					<Image class="h-10 w-10 text-background" />
				</div>
			{/if}
		</a>

		<div class="flex flex-col justify-center *:my-2">
			<p class="text-3xl font-bold">{name}</p>
			<p class="line-clamp-2 text-sm">{description}</p>
			<div class="*:pr-4">
				<a href="mailto:{email}">Email</a>
				<a href={website} target="_blank">Website</a>
			</div>
		</div>
	</div>

</a>
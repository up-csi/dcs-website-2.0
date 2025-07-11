<script lang="ts">
	import { Image } from 'lucide-svelte';
	import { PUBLIC_APIURL } from '$env/static/public';
	import { reloading } from '$lib/stores';

	export let organization;
	let logo_height: number;

	$: ({ name, logo, description, website, slug } = organization);
</script>

<a
	href="/students/organizations/{slug}"
	data-sveltekit-reload
	on:click={() => {
		$reloading = true;
	}}
>
	<div
		class="my-4 flex flex-col justify-center gap-6 rounded-lg p-10 text-center text-background md:flex-row md:justify-start md:text-start"
		style="background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)/0.25)); grid-template-columns: 1fr auto;"
	>
		<a
			href={website}
			class="flex justify-center md:justify-start"
			target="_blank"
			bind:clientHeight={logo_height}
		>
			{#if logo && logo_height}
				<div class="flex h-40 w-40 items-center justify-center">
					<img
						src="{PUBLIC_APIURL}/assets/{logo}?height={logo_height}"
						alt={name}
						class="max-h-40 max-w-40"
					/>
				</div>
			{:else}
				<div class="flex h-40 w-40 items-center justify-center rounded-full bg-secondary">
					<Image class="h-10 w-10 text-background" />
				</div>
			{/if}
		</a>

		<div class="flex flex-col justify-center *:my-2 md:max-w-[50vw]">
			<p class="text-xl font-bold leading-tight sm:text-2xl lg:text-3xl">{name}</p>
			{#if description}
				<p class="line-clamp-2 text-sm">{description}</p>
			{/if}
		</div>
	</div>
</a>

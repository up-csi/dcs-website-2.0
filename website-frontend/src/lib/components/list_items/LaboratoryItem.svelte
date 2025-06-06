<script lang="ts">
	import { Image } from 'lucide-svelte';
	import { PUBLIC_APIURL } from '$env/static/public';
	import { reloading } from '$lib/stores';

	export let laboratory;
	$: ({ name, logo, description, slug } = laboratory);
</script>

<a
	href="/research/labs/{slug}"
	data-sveltekit-reload
	on:click={() => {
		$reloading = true;
	}}
>
	<div
		class="my-4 flex flex-col justify-center gap-6 rounded-lg p-10 text-center text-background md:flex-row md:justify-start md:text-start"
		style="background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)/0.25)); grid-template-columns: 1fr auto;"
	>
		<div class="flex justify-center md:justify-start">
			{#if logo}
				<div class="flex h-40 w-40 items-center justify-center">
					<img
						src="{PUBLIC_APIURL}/assets/{logo}?height=180"
						alt={name}
						class="max-h-40 max-w-40"
					/>
				</div>
			{:else}
				<div class="flex h-40 w-40 items-center justify-center rounded-full bg-secondary">
					<Image class="h-10 w-10 text-background" />
				</div>
			{/if}
		</div>

		<div class="flex flex-col justify-center *:my-2 md:max-w-[50vw]">
			<p class="text-xl font-bold leading-tight sm:text-2xl lg:text-3xl">{name}</p>
			<p class="line-clamp-2 text-sm">{description}</p>
		</div>
	</div>
</a>

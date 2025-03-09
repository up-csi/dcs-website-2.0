<script lang="ts">
	import type { Alumnus } from '$lib/types/alumni';
	import * as Card from '$lib/@shadcn-svelte/ui/card';
	import { Image } from 'lucide-svelte';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let alumnus: Alumnus;
	$: ({ batch, img, name, accolades } = alumnus);
</script>

<Card.Root class="card h-[396px] border-0">
	<Card.Content class="card flex h-full w-full flex-col p-3">
		<div class="flex w-64 items-center justify-center rounded-lg bg-secondary py-24">
			{#if img}
				<img src="{PUBLIC_APIURL}/assets/{img}" alt={name} />
			{:else}
				<Image class="my-3 h-10 w-10 text-background" />
			{/if}
		</div>

		<div
			class="flex h-full w-full grow flex-col items-center overflow-hidden pt-1 text-center *:mt-1"
		>
			<p class="text-xs font-semibold text-muted-foreground">Batch {batch}</p>
			<p class="text-2xl font-bold text-foreground">{name}</p>
			{#each accolades as accolade}
				<p class="text-xs text-secondary">{accolade}</p>
			{/each}
		</div>
	</Card.Content>
</Card.Root>

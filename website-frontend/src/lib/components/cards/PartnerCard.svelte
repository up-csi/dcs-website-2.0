<script lang="ts">
	import type { Partner } from '$lib/types/partners';
	import * as Card from '$lib/@shadcn-svelte/ui/card';
	import { Image } from 'lucide-svelte';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let partner: Partner;
	$: ({ src, name, description } = partner);
</script>

<Card.Root class="card h-[286px] w-[376px] border-0">
	<Card.Content class="card h-full w-full p-3">
		<div class="flex">
			{#if src}
				<img src="{PUBLIC_APIURL}/assets/{src}" alt={name} />
			{:else}
				<div class="flex h-32 w-32 items-center justify-center rounded-full bg-secondary">
					<Image class="h-10 w-10 text-background" />
				</div>
			{/if}
		</div>

		<div class="flex h-full w-full grow flex-col pt-1 *:mt-2">
			<p class="text-xl font-bold text-primary">{name}</p>
			<p class="text-sm text-secondary">{description}</p>
		</div>
	</Card.Content>
</Card.Root>

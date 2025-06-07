<script lang="ts">
	import * as Card from '$lib/@shadcn-svelte/ui/card';
	import * as Dialog from '$lib/@shadcn-svelte/ui/dialog';
	import Button from '$lib/@shadcn-svelte/ui/button/button.svelte';
	import { Mail } from 'lucide-svelte';
	import { Globe } from 'lucide-svelte';
	import { Image } from 'lucide-svelte';
	import { PUBLIC_APIURL } from '$env/static/public';
	import type { Partnership } from '$lib/models/partnerships';

	export let partner: Partnership;
	let trigger_banner_height: number;
	let content_banner_height: number;
	$: ({ display_image, name, description } = partner);
</script>

<Dialog.Root>
	<Dialog.Trigger class="h-full w-full">
		<Card.Root class="card h-full w-full border-0">
			<Card.Content class="card h-full w-full p-4">
				<div class="flex flex-col gap-y-5">
					<div class="flex" bind:clientHeight={trigger_banner_height}>
						{#if display_image && trigger_banner_height}
							<img
								class="h-32 object-contain"
								src="{PUBLIC_APIURL}/assets/{display_image}?height={trigger_banner_height}"
								alt={name}
							/>
						{:else}
							<div class="flex h-32 w-32 items-center justify-center rounded-full bg-secondary">
								<Image class="h-10 w-10 text-background" />
							</div>
						{/if}
					</div>

					<div class="flex h-full w-full grow flex-col gap-y-2 pt-1">
						<p class="text-start text-xl font-bold text-primary">{name}</p>
						<p class="line-clamp-3 text-start text-sm text-secondary">{description}</p>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	</Dialog.Trigger>
	<Dialog.Content class="mx-auto w-full max-w-[90vw] rounded-lg md:max-w-lg">
		<Dialog.Header class="flex flex-col gap-y-2">
			<div class="relative flex" bind:clientHeight={content_banner_height}>
				{#if display_image && content_banner_height}
					<img
						class="h-32 object-contain"
						src="{PUBLIC_APIURL}/assets/{display_image}?height={content_banner_height}"
						alt={name}
					/>
				{:else}
					<div class="flex h-32 items-center justify-center rounded-full bg-secondary">
						<Image class="h-10 w-10 text-background" />
					</div>
				{/if}
			</div>
			<div class="flex flex-col gap-y-2">
				<div class="flex items-end justify-between">
					<Dialog.Title class="text-xl">
						{partner.name}
					</Dialog.Title>
					{#if partner.email || partner.website}
						<div class="flex items-center gap-x-1">
							{#if partner.email}
								<Button
									href="mailto:{partner.email}"
									variant="outline"
									class="flex rounded-full p-3"><Mail class="size-4" /></Button
								>
							{/if}
							{#if partner.website}
								<Button
									href={partner.website}
									target="_blank"
									variant="outline"
									class="flex rounded-full p-3"><Globe class="size-4" /></Button
								>
							{/if}
						</div>
					{/if}
				</div>
				<Dialog.Description class="flex flex-col gap-y-2">
					{#if partner.description}
						<div class="text-start">
							<small>{partner.description}</small>
						</div>
					{/if}
				</Dialog.Description>
			</div>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>

<script lang="ts">
	import { ScrollText } from 'lucide-svelte';
	import * as Card from '$lib/@shadcn-svelte/ui/card';
	import * as Dialog from '$lib/@shadcn-svelte/ui/dialog';
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Publication } from '$lib/models/publications';
	import { SquareArrowOutUpRight } from 'lucide-svelte';
	import { reloading } from '$lib/stores';

	export let publication: Publication;
</script>

<Dialog.Root>
	<Dialog.Trigger class="h-full w-full pt-20">
		<Card.Root class="h-full w-full">
			<Card.Header class="relative flex h-80 flex-col items-center">
				<div
					class="-mt-24 w-full max-w-[calc(var(--card-height)*0.5)] flex-grow overflow-hidden rounded-lg bg-gray-100"
				>
					{#if publication.hero_image}
						<img
							src="{PUBLIC_APIURL}/assets/{publication.hero_image}"
							alt={publication.title}
							class="h-full w-full rounded-lg object-cover"
						/>
					{:else}
						<div class="flex h-full w-full items-center justify-center rounded-lg bg-muted">
							<ScrollText class="w-20 bg-muted text-muted-foreground" />
						</div>
					{/if}
				</div>
				<Card.Title class="w-full py-2 text-center">{publication.title}</Card.Title>
				<Card.Description class="flex w-full flex-col justify-between gap-x-4 pb-4 lg:flex-row">
					<p class="text-center text-sm text-gray-500 lg:text-start">
						{publication.authors?.map((a) => a.last_name).join(', ')}
					</p>
					<p class="text-center text-sm text-gray-500 lg:text-end">
						{#if publication.publish_date}
							{new Date(publication.publish_date).toLocaleDateString('en-EN', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						{/if}
					</p>
				</Card.Description>
			</Card.Header>
		</Card.Root>
	</Dialog.Trigger>
	<Dialog.Content class="mx-auto w-full max-w-[90vw] rounded-lg md:max-w-lg">
		<Dialog.Header class="flex flex-col gap-y-1">
			<Dialog.Title>{publication.title}</Dialog.Title>
			<Dialog.Description class="flex flex-col gap-y-2">
				<div>
					{#if publication.publish_date}
						<div class="text-start">
							<strong>Date published:</strong>
							{new Date(publication.publish_date).toLocaleDateString('en-EN', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</div>
					{/if}
					{#if publication.authors}
						<div class="flex gap-x-1">
							{#if publication.authors.length !== 1}
								<strong>Authors:</strong>
							{:else}
								<strong>Author:</strong>
							{/if}
							{#each publication.authors as author, i}
								{#if author.link && typeof author.link === 'string'}
									<a
										href={author.link}
										class="text-blue-500"
										data-sveltekit-reload
										on:click={() => {
											$reloading = true;
										}}
										>{author.last_name}, {author.first_name}
									</a>
								{:else}
									<span>{author.last_name}, {author.first_name} </span>
								{/if}
								{#if i + 1 !== publication.authors.length}
									<div>&</div>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
				{#if publication.abstract}
					<div class="text-start">
						<small><strong>Abstract:</strong> {publication.abstract}</small>
					</div>
				{/if}
				{#if publication.access_links}
					<div>
						<small class="flex gap-x-1">
							{#if publication.access_links.length !== 1}
								<strong>Access Links:</strong>
							{:else}
								<strong>Access Link:</strong>
							{/if}
							{#each publication.access_links as access_link, i}
								<div class="flex gap-x-1">
									<a href={access_link.url} target="_blank">
										<div class="flex gap-x-1">
											{#if access_link.display}
												<div>{access_link.display}</div>
											{:else}
												<div>Access Link {i + 1}</div>
											{/if}
											<div class="flex w-min flex-col justify-center">
												<SquareArrowOutUpRight class="size-3" />
											</div>
										</div>
									</a>
									{#if i + 1 !== publication.access_links.length}
										<div class="select-none">|</div>
									{/if}
								</div>
							{/each}
						</small>
					</div>
				{/if}
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>

<script lang="ts">
	import { ScrollText } from 'lucide-svelte';
	import * as Card from '$lib/@shadcn-svelte/ui/card';
	import * as Dialog from '$lib/@shadcn-svelte/ui/dialog';
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Publication } from '$lib/models/publications';
	import { SquareArrowOutUpRight } from 'lucide-svelte';

	export let publication: Publication;
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<div class="relative flex h-96 justify-center">
			<div
				class="absolute bottom-0 h-80 w-full rounded-lg border shadow-[1px_2px_10px_0px_rgba(0,0,0,0.09)]"
			></div>
			<Card.Root
				class="absolute bottom-0 z-10 flex h-96 w-full flex-col justify-end border-none !bg-transparent shadow-none"
			>
				<div class="flex min-h-0 flex-1 justify-center">
					{#if publication.hero_image}
						<img
							src="{PUBLIC_APIURL}/assets/{publication.hero_image}"
							alt={publication.title}
							class="w-[calc(var(--card-height)*0.5)] rounded-lg object-cover"
						/>
					{:else}
						<div class="flex w-[calc(var(--card-height)*0.5)] items-center justify-center bg-muted">
							<ScrollText class="w-20 bg-muted text-muted-foreground" />
						</div>
					{/if}
				</div>
				<Card.Header class="mb-5">
					<Card.Title class="flex justify-center text-center">{publication.title}</Card.Title>
				</Card.Header>
				<Card.Footer class="flex justify-between">
					<small class="text-sm text-gray-500">
						{#each publication.authors.slice(0, -1) as author}
							{author.last_name},
						{/each}
						{publication.authors.at(-1)?.last_name}
					</small>
					<small class="text-sm text-gray-500">
						{#if publication.publish_date}
							{new Date(publication.publish_date).toLocaleDateString('en-EN', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						{/if}
					</small>
				</Card.Footer>
			</Card.Root>
		</div>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header class="flex flex-col gap-y-1">
			<Dialog.Title>{publication.title}</Dialog.Title>
			<Dialog.Description class="flex flex-col gap-y-2">
				<div>
					{#if publication.publish_date}
						<div>
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
									<a href={author.link} class="text-blue-500" data-sveltekit-reload
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
					<div>
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

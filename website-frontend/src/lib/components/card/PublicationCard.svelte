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
		<div class="flex h-80 flex-col justify-end">
			<Card.Root class="flex h-64 flex-col justify-end gap-y-5">
				<div class="flex h-full justify-center">
					{#if publication.hero_image}
						<img
							src="{PUBLIC_APIURL}/assets/{publication.hero_image}"
							alt={publication.title}
							style="width: calc(var(--card-height) * (19 / 45));"
						/>
					{:else}
						<div
							class="flex h-full items-center justify-center bg-muted"
							style="width: calc(var(--card-height) * (19 / 45));"
						>
							<ScrollText class="h-20 w-20 bg-muted text-muted-foreground" />
						</div>
					{/if}
				</div>
				<Card.Header>
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
						<div>
							{#if publication.authors.length !== 1}
								<strong>Authors:</strong>
							{:else}
								<strong>Author:</strong>
							{/if}
							{#each publication.authors.slice(0, -1) as author}
								{author.last_name}, {author.first_name} &
							{/each}
							{publication.authors.at(-1)?.last_name},
							{publication.authors.at(-1)?.first_name}
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

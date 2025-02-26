<script lang="ts">
	import { ScrollText } from 'lucide-svelte';
	import * as Card from '$lib/@shadcn-svelte/ui/card';
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Publication } from '$lib/models/publications';

	export let publication: Publication;
</script>

{#if publication.access_links && publication.access_links.length !== 0}
	<a href={publication.access_links[0].url} class="flex h-80 flex-col justify-end">
		<Card.Root class="flex h-64 flex-col justify-end gap-y-5">
			<div class="flex h-max justify-center">
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
				<div>
					{#each publication.authors.slice(0, -1) as author}
						{author.last_name},
					{/each}
					{publication.authors.at(-1)?.last_name}
				</div>
				<div>
					{#if publication.publish_date}
						{new Date(publication.publish_date).toLocaleDateString('en-EN', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					{/if}
				</div>
			</Card.Footer>
		</Card.Root>
	</a>
{:else}
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
				<div>
					{#each publication.authors.slice(0, -1) as author}
						{author.last_name},
					{/each}
					{publication.authors.at(-1)?.last_name}
				</div>
				<div>
					{#if publication.publish_date}
						{new Date(publication.publish_date).toLocaleDateString('en-EN', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					{/if}
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
{/if}

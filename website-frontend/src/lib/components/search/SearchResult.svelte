<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import * as Dialog from '$lib/@shadcn-svelte/ui/dialog';
	import { SquareArrowOutUpRight } from 'lucide-svelte';
	import { Publication } from '$lib/models/publications';
	import { reloading } from '$lib/stores';

	export let publication: Publication | null = null;
	export let image: string | null | undefined;
	export let name: string;
	export let href: string;

	$: publications_tags = publication
		? publication.publication_tags
			? publication.publication_tags
					.filter((tag) => typeof tag === 'object')
					.map(({ publications_tags_id }) => {
						if (typeof publications_tags_id === 'object') return publications_tags_id.name;
					})
					.filter((tag) => typeof tag !== 'undefined')
			: []
		: [];

	let pubs_banner_height: number;
	let general_banner_height: number;
</script>

{#if !publication}
	<a {href}>
		<div
			class="grid items-center justify-start gap-5 border-b py-2 text-start"
			style="grid-template-columns: 1fr 3fr;"
		>
			<div
				class="flex h-36 w-full items-center justify-center overflow-hidden rounded-lg p-2 shadow-none sm:h-60 lg:h-96"
				bind:clientHeight={general_banner_height}
			>
				{#if image && general_banner_height}
					<img
						src="{PUBLIC_APIURL}/assets/{image}?height={general_banner_height}"
						alt={name}
						class="max-h-full max-w-full rounded-lg"
					/>
				{/if}
			</div>

			<div class="w-full">
				<slot />
			</div>
		</div>
	</a>
{:else}
	<Dialog.Root>
		<Dialog.Trigger>
			<div
				class="grid items-center justify-start gap-5 border-b py-2 text-start"
				style="grid-template-columns: 1fr 3fr;"
			>
				<div
					class="flex h-36 w-full items-center justify-center overflow-hidden rounded-lg p-2 shadow-none sm:h-60 lg:h-96"
					bind:clientHeight={pubs_banner_height}
				>
					{#if image && pubs_banner_height}
						<img
							src="{PUBLIC_APIURL}/assets/{image}?height={pubs_banner_height}"
							alt={name}
							class="max-h-full max-w-full rounded-lg"
						/>
					{/if}
				</div>

				<div class="w-full">
					<slot />
				</div>
			</div>
		</Dialog.Trigger>
		<Dialog.Content class="mx-auto w-full max-w-[90vw] rounded-lg md:max-w-lg">
			<Dialog.Header class="flex flex-col gap-y-1">
				<Dialog.Title class="text-start">{publication.title}</Dialog.Title>
				<Dialog.Description class="flex flex-col gap-y-2">
					{#if publications_tags.length !== 0}
						<div class="flex h-3 items-center border-l-[4px] border-primary-dark pl-2 text-sm">
							<small class="capitalize">
								{#each publications_tags.slice(0, -1) as publications_tag}
									{`${publications_tag}, `}
								{/each}
								{publications_tags.at(-1)}
							</small>
						</div>
					{/if}
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
{/if}

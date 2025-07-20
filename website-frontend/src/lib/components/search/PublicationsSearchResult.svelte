<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import * as Dialog from '$lib/@shadcn-svelte/ui/dialog';
	import { SquareArrowOutUpRight } from 'lucide-svelte';
	import { Publication } from '$lib/models/publications';
	import { reloading } from '$lib/stores';

	export let item: Publication;

	$: publications_tags = item
		? item.publication_tags
			? item.publication_tags
					.filter((tag) => typeof tag === 'object')
					.map(({ publications_tags_id }) => {
						if (typeof publications_tags_id === 'object') return publications_tags_id.name;
					})
					.filter((tag) => typeof tag !== 'undefined')
			: []
		: [];

	let pubs_banner_height: number;
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<div
			class="flex flex-col items-center justify-start gap-2 border-b py-5 text-center sm:flex-row sm:text-start"
		>
			{#if item.hero_image}
				<div
					class="flex h-36 w-full flex-col items-center justify-center overflow-hidden rounded-lg p-2 shadow-none md:w-2/5"
					bind:clientHeight={pubs_banner_height}
				>
					{#if pubs_banner_height}
						<img
							src="{PUBLIC_APIURL}/assets/{item.hero_image}?height={pubs_banner_height}"
							alt={item.title}
							class="h-full w-full rounded-lg object-cover"
						/>
					{/if}
				</div>
			{/if}

			<div class="w-full">
				<p class="text-xl font-bold">{item.title}</p>
				{#if item.abstract}
					<p class="line-clamp-2">
						{item.abstract}
					</p>
				{/if}
			</div>
		</div>
	</Dialog.Trigger>
	<Dialog.Content class="mx-auto w-full max-w-[90vw] rounded-lg md:max-w-lg">
		<Dialog.Header class="flex flex-col gap-y-1">
			<Dialog.Title class="text-start">{item.title}</Dialog.Title>
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
					{#if item.publish_date}
						<div class="text-start">
							<strong>Date published:</strong>
							{new Date(item.publish_date).toLocaleDateString('en-EN', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</div>
					{/if}
					{#if item.authors}
						{#if item.authors.length !== 1}
							<strong>Authors:</strong>
						{:else}
							<strong>Author:</strong>
						{/if}
						{#each item.authors as author, i}
							{#if author.link && typeof author.link === 'string'}
								<a
									href={author.link}
									class="text-blue-500"
									data-sveltekit-reload
									on:click={() => {
										$reloading = true;
									}}
									>{`${author.last_name}, ${author.first_name}`}
								</a>
							{:else}
								<span>{`${author.last_name}, ${author.first_name}`}</span>
							{/if}
							{#if i + 1 !== item.authors.length}
								<span>{` & `}</span>
							{/if}
						{/each}
					{/if}
				</div>
				{#if item.abstract}
					<div class="text-start">
						<small><strong>Abstract:</strong> {item.abstract}</small>
					</div>
				{/if}
				{#if item.access_links}
					<div>
						<small class="flex gap-x-1">
							{#if item.access_links.length !== 1}
								<strong>Access Links:</strong>
							{:else}
								<strong>Access Link:</strong>
							{/if}
							{#each item.access_links as access_link, i}
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
									{#if i + 1 !== item.access_links.length}
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

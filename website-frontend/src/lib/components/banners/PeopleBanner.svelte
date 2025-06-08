<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Image, Mail, Globe } from 'lucide-svelte';
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import Breadcrumb from '../breadcrumbs/BannerBreadcrumb.svelte';

	export let background_image: string = '';
	export let profile_image: string = '';
	export let first_name: string = '';
	export let last_name: string = '';
	export let position: string = '';
	export let email: string = '';
	export let laboratory: string = '';
	export let website: string = '';

	let banner_height: number;
	let profile_height: number;
	$: profile_width = profile_height;
</script>

<div class="bg-background-dark" bind:clientHeight={banner_height}>
	{#if background_image && banner_height}
		<div
			class="h-[45vh] bg-cover bg-center lg:h-[83vh]"
			style="background-image: linear-gradient(to top, #343541, transparent), url('{PUBLIC_APIURL}/assets/{background_image}?height={banner_height}')"
		></div>
	{/if}

	<div class="-mt-14 w-full px-4 lg:absolute lg:-bottom-16 lg:px-32">
		<Breadcrumb page_name="{first_name} {last_name}" />

		<div
			class="flex w-full flex-col items-center pt-10 text-secondary-foreground lg:bottom-10 lg:flex-row lg:py-10"
		>
			<div
				bind:clientHeight={profile_height}
				class="mx-auto flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-t from-[#667080] to-[#D1D8DD] md:h-48 md:w-48"
			>
				{#if profile_image && profile_width && profile_height}
					<img
						class="h-full w-full rounded-full object-cover"
						src="{PUBLIC_APIURL}/assets/{profile_image}?fit=cover&width={profile_width}&height={profile_height}"
						alt="{first_name} {last_name}'s profile picture"
					/>
				{:else}
					<Image class="h-10 w-10 text-secondary" />
				{/if}
			</div>

			<div class="mt-4 w-full md:mt-6 lg:ml-12 lg:mt-0">
				<div class="flex w-full justify-center lg:justify-start">
					<h1
						class="max-w-2xl text-center text-4xl font-bold lg:text-start lg:text-[2.85rem] lg:leading-[3.2rem]"
					>
						{first_name}
						{last_name}
					</h1>
				</div>

				<div
					class="flex flex-col items-center justify-center text-center lg:flex-row lg:justify-between"
				>
					<div class="flex space-x-2 text-[#D9D9D9]">
						<p>{position}</p>
						{#if laboratory}
							<p>·</p>
							<p>{laboratory}</p>
						{/if}
					</div>

					<div class="mt-5 flex space-x-1 lg:mt-0">
						<div class="group relative">
							<a href="mailto:{email}" class="max-w-xs">
								<Button
									class="w-full rounded-full bg-background/20 px-3 hover:bg-background/30"
									aria-label="Send an email to {first_name} {last_name}"
								>
									<Mail class="h-4 w-4" />
								</Button>
							</a>
							<span
								class="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded bg-white px-2 py-1 text-xs text-primary group-hover:block"
							>
								{email}
							</span>
						</div>

						{#if website}
							<div class="group relative">
								<a href={website} target="_blank" rel="noopener noreferrer" class="max-w-xs">
									<Button
										class="w-full rounded-full bg-background/20 px-3 hover:bg-background/30"
										aria-label="Go to {first_name} {last_name}'s website"
									>
										<Globe class="h-4 w-4" />
									</Button>
								</a>
								<span
									class="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded bg-white px-2 py-1 text-xs text-primary group-hover:block"
								>
									{website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
								</span>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

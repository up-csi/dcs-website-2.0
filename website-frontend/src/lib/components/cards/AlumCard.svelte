<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import * as Dialog from '$lib/@shadcn-svelte/ui/dialog';
	import { Alum } from '$lib/models/alumni';
	export let alum: Alum;
</script>

<Dialog.Root>
	<Dialog.Trigger class="h-full w-full pt-20">
		<div class="card group relative flex h-full w-full flex-col overflow-hidden">
			<div class="inset-0 h-36 overflow-hidden rounded-t-lg bg-gray-300 md:h-52">
				{#if alum.background_image}
					<img
						class="h-full w-full rounded-t-lg object-cover transition-transform duration-300 ease-out group-hover:scale-105"
						src="{PUBLIC_APIURL}/assets/{alum.background_image}?height=360"
						alt="Background"
					/>
				{/if}
			</div>

			<div class="z-10 -mt-16 items-center px-3 md:-mt-20">
				<div
					class="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full md:h-32 md:w-32"
				>
					<div
						class="absolute -inset-[2px] -z-10 rounded-full border-2 border-primary/20 backdrop-blur-lg md:-inset-1 md:border-4"
					></div>

					{#if alum.profile_image}
						<img
							class="h-full w-full rounded-full object-cover"
							src="{PUBLIC_APIURL}/assets/{alum.profile_image}?fit=cover&width=180&height=180"
							alt="Profile"
						/>
					{:else}
						<h1 class="text-center text-2xl font-medium text-[#004420a2]">`⎚⩊⎚´</h1>
					{/if}
				</div>

				<div class="mb-3 mt-2 p-3 text-center">
					<div class="text-xs font-semibold uppercase leading-none opacity-55 md:leading-tight">
						<p>Batch {alum.batch}</p>
					</div>
					<h3 class="py-2 font-bold leading-none text-gray-900 md:text-xl">
						{alum.first_name}
						{alum.last_name}
					</h3>
					{#if alum.title}
						<div class="mb-2 text-sm font-medium">
							<p>{alum.title}</p>
						</div>
					{/if}
					{#if alum.description}
						<div class="mb-3 text-xs opacity-75">
							<p class="line-clamp-3">{alum.description}</p>
						</div>
					{/if}
					{#if alum.accolade}
						{#each alum.accolade as accolade}
							<div class="text-xs font-medium leading-none opacity-55 md:px-6 md:leading-tight">
								<p class="line-clamp-2 w-full">{accolade.name}</p>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</Dialog.Trigger>
	<Dialog.Content class="mx-auto w-full rounded-lg">
		<div class="group relative flex h-full w-full flex-col overflow-hidden pt-5">
			<div class="inset-0 h-36 overflow-hidden rounded-t-lg bg-gray-300 md:h-52">
				{#if alum.background_image}
					<img
						class="h-full w-full rounded-t-lg object-cover"
						src="{PUBLIC_APIURL}/assets/{alum.background_image}?height=360"
						alt="Background"
					/>
				{/if}
			</div>

			<div class="z-10 -mt-16 items-center px-3 md:-mt-20">
				<div
					class="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full md:h-32 md:w-32"
				>
					<div
						class="absolute -inset-[2px] -z-10 rounded-full border-2 border-primary/20 backdrop-blur-lg md:-inset-1 md:border-4"
					></div>

					{#if alum.profile_image}
						<img
							class="h-full w-full rounded-full object-cover"
							src="{PUBLIC_APIURL}/assets/{alum.profile_image}?fit=cover&width=180&height=180"
							alt="Profile"
						/>
					{:else}
						<h1 class="text-center text-2xl font-medium text-[#004420a2]">`⎚⩊⎚´</h1>
					{/if}
				</div>

				<Dialog.Header>
					<div class="mb-3 mt-2 p-3 text-center">
						<div class="text-xs font-semibold uppercase leading-none opacity-55 md:leading-tight">
							<p>Batch {alum.batch}</p>
						</div>
						<Dialog.Title
							class="py-2 font-bold leading-none tracking-normal text-gray-900 md:text-xl"
						>
							{alum.first_name}
							{alum.last_name}
						</Dialog.Title>
						{#if alum.title}
							<div class="mb-2 text-sm font-medium">
								<p>{alum.title}</p>
							</div>
						{/if}
						{#if alum.description}
							<Dialog.Description class="mb-3 text-xs">
								<p>{alum.description}</p>
							</Dialog.Description>
						{/if}
						{#if alum.accolade}
							{#each alum.accolade as accolade}
								<div class="text-xs font-medium leading-none opacity-55 md:px-6 md:leading-tight">
									<p class="w-full">{accolade.name}</p>
								</div>
							{/each}
						{/if}
					</div>
				</Dialog.Header>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>

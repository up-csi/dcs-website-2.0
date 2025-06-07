<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';

	import { Person } from '$lib/models/people';

	export let item: Person;
	export let laboratory: string = '';

	let banner_height: number;
	let profile_width: number;
	let profile_height: number;
</script>

<div class="card group relative flex h-full w-full flex-col overflow-hidden">
	<div
		class="inset-0 h-36 overflow-hidden rounded-t-lg bg-gray-300 md:h-52"
		bind:clientHeight={banner_height}
	>
		{#if item.background_image && banner_height}
			<img
				class="h-full w-full rounded-t-lg object-cover transition-transform duration-300 ease-out group-hover:scale-105"
				src="{PUBLIC_APIURL}/assets/{item.background_image}?height={banner_height}"
				alt="Background"
			/>
		{/if}
	</div>

	<div class="z-10 -mt-16 items-center px-3 md:-mt-20">
		<div
			class="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full md:h-32 md:w-32"
			bind:clientWidth={profile_width}
			bind:clientHeight={profile_height}
		>
			<div
				class="absolute -inset-[2px] -z-10 rounded-full border-2 border-primary/20 backdrop-blur-lg md:-inset-1 md:border-4"
			></div>

			{#if item.profile_image && profile_width && profile_height}
				<img
					class="h-full w-full rounded-full object-cover"
					src="{PUBLIC_APIURL}/assets/{item.profile_image}?fit=cover&width={profile_width}&height={profile_height}"
					alt="Profile"
				/>
			{:else}
				<h1 class="text-center text-2xl font-medium text-[#004420a2]">`⎚⩊⎚´</h1>
			{/if}
		</div>

		<div class="mb-3 mt-2 p-3 text-center">
			<div class="text-xs font-semibold uppercase leading-none opacity-55 md:leading-tight">
				<p>{item.position}</p>
			</div>
			<h3 class="py-2 font-bold leading-none text-gray-900 md:text-xl">
				{item.first_name}
				{item.last_name}
			</h3>
			{#if laboratory}
				<div class="text-xs font-medium leading-none opacity-55 md:px-6 md:leading-tight">
					<p class="line-clamp-2 w-full">{laboratory}</p>
				</div>
			{/if}
		</div>
	</div>
</div>

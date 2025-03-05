<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';

	import { Person } from '$lib/models/people';
	export let person: Person;
	export let laboratory: string;
</script>

<div class="card relative flex h-full flex-col overflow-hidden w-full group">
	<div class="inset-0 h-28 rounded-t-lg bg-gray-300 md:h-44 overflow-hidden">
		{#if person.background_image}
			<img
				class="h-full w-full rounded-t-lg object-cover transition-transform duration-300 ease-out group-hover:scale-105"
				src="{PUBLIC_APIURL}/assets/{person.background_image}"
				alt="Background"
			/>
		{/if}
	</div>

	<div class="z-10 -mt-16 items-center px-3 md:-mt-20">
		<div class="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full md:h-32 md:w-32">
			
			<div class="absolute -inset-[2px] md:-inset-1 -z-10 rounded-full border-2 md:border-4 border-primary/20 backdrop-blur-lg"></div>
		
			{#if person.profile_image}
				<img
					class="h-full w-full rounded-full object-cover"
					src="{PUBLIC_APIURL}/assets/{person.profile_image}"
					alt="Profile"
				/>
			{:else}
				<h1 class="text-center text-2xl font-medium text-[#004420a2]">`⎚⩊⎚´</h1>
			{/if}
		</div>

		<div class="p-3 mt-2 mb-3 text-center">
			<div class="text-xs font-semibold uppercase leading-none md:leading-tight opacity-55">
				<p>{person.position}</p>
			</div>
			<h3 class="py-2 font-bold leading-none text-gray-900 md:text-xl">
				{person.first_name}
				{person.last_name}
			</h3>
			{#if laboratory}
				<div class="text-xs font-medium leading-none md:leading-tight opacity-55 md:px-6">
					<p class="line-clamp-2 w-full">{laboratory}</p>
				</div>
			{/if}
		</div>
	</div>
</div>

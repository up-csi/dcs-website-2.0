<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';

    import { Person } from '$lib/models/people';
	export let person: Person;
</script>


<div
	class="relative flex h-full flex-col overflow-hidden rounded-lg bg-white py-2 shadow-xl"
>
	{#if person.background_image}
		<img
			class="inset-0 h-44 rounded-t-lg object-cover"
			src="{PUBLIC_APIURL}/assets/{person.background_image}"
			alt=""
		/>
	{:else}
		<div class="inset-0 hidden h-44 rounded-t-lg bg-gray-300 md:block"></div>
	{/if}
	<div class="z-10 flex items-center md:-mt-24 md:block md:px-3">
		<div class="photo-wrapper p-2 md:bottom-9">
			<img
				class="mx-auto h-28 w-28 rounded-full border-4 border-gray-200 object-cover md:h-32 md:w-32"
				src="{PUBLIC_APIURL}/assets/{person.profile_image}"
				alt="Profile"
			/>
		</div>
		<div class="p-3 md:mb-3 md:mt-2 md:text-center">
			<div class="text-xs font-semibold uppercase leading-tight text-gray-500">
				<p>{person.position}</p>
			</div>
			<h3 class="text-xl font-bold text-gray-900 md:py-3 md:leading-tight">
				{person.first_name}
				{person.last_name}
			</h3>
			<div class="flex max-w-[55vw] items-center justify-center text-xs text-gray-500">
				<!-- add logo to lab affiliation -->
				<img src="/path/to/lab_logo.png" alt="Logo" class="mr-2 h-3 w-3" />
				<p class="w-full truncate">Computer Vision and Machine Intelligence Group</p>
			</div>
		</div>
	</div>
</div>
<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';

    import { Person } from '$lib/models/people';
	export let person: Person;
</script>

<div
	class="relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-xl"
>
    <div class="inset-0 md:h-40 h-24 rounded-t-lg bg-gray-300">
        {#if person.background_image}
            <img class="w-full h-full object-cover rounded-t-lg" src="{PUBLIC_APIURL}/assets/{person.background_image}" alt="Background" />
        {/if}
    </div>

	<div class="z-10 items-center px-3 -mt-16 md:-mt-20">

        <div class="mx-auto rounded-full border-4 border-gray-200 bg-gray-100 h-28 w-28 md:h-32 md:w-32 flex items-center justify-center">
            {#if person.profile_image}
                <img
                    class="object-cover h-full w-full rounded-full"
                    src="{PUBLIC_APIURL}/assets/{person.profile_image}"
                    alt="Profile"
                />
            {:else}
                <h1 class="font-medium text-2xl text-[#004420a2] text-center">`⎚⩊⎚´</h1>
            {/if}
        </div>        

		<div class="p-3 md:mb-3 md:mt-2 text-center">
			<div class="text-xs font-semibold uppercase leading-tight text-gray-500">
				<p>{person.position}</p>
			</div>
			<h3 class="font-bold text-gray-900 leading-tight pb-2 md:text-xl md:py-1">
				{person.first_name}
				{person.last_name}
			</h3>
			<div class="flex items-center justify-center text-xs text-gray-500 md:px-6">
				<p class="w-full line-clamp-2">Computer Vision and Machine Intelligence Group</p>
			</div>
		</div>
	</div>
</div>
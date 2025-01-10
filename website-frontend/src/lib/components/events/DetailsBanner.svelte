<script lang="ts">
	import { deslugify } from '$lib/utils';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let title: string;
	export let background_image: string;
	export let location: string;
    export let start_date: string;
    export let end_date: string;

	$: deslugify_title = deslugify(title);
</script>

<div class="relative z-0">
	<div
		class="h-[45vh] bg-cover bg-center md:h-[70vh]"
		style="background-image: linear-gradient(to top, #004420, transparent), url('{PUBLIC_APIURL}/assets/{background_image}')"
	></div>

    <div class="-mt-[0.1px] pb-10 pt-10 md:pb-0 md:absolute md:bottom-10 w-full bg-[#004420] md:bg-transparent">
	    <div
	    	class="flex w-full
            px-5 text-center items-center flex-col
            md:px-32 md:text-start md:flex-row md:justify-between"
	    >
            <div class="md:max-w-[60vw] text-white">
                <h1 class="text-3xl font-bold md:mb-4 md:text-4xl">{deslugify_title}</h1>
                <div class="my-6 md:flex md:my-0 text-gray-300">
                    <h4 class="md:mr-10">{@html location}</h4>
                    <h4>Start Time - End Time</h4>
                </div>
            </div>
        

            <div class="flex flex-row items-center md:pl-12">
                <div class="h-28 w-28 md:h-36 md:w-36 flex flex-col rounded-lg bg-white shadow-xl justify-center items-center text-gray-900">
                    <h1 class="font-bold text-4xl md:text-5xl md:mb-2">18</h1>
                    <h3 class="font-medium text-[#004420]">January</h3>
                </div>

                {#if end_date}
                    <div class="h-1 w-3 bg-gray-300 mx-3"></div>
                    <div class="h-28 w-28 md:h-36 md:w-36 flex flex-col rounded-lg bg-white shadow-xl justify-center items-center text-gray-900">
                        <h1 class="font-bold text-4xl md:text-5xl md:mb-2">20</h1>
                        <h3 class="font-medium text-[#004420]">January</h3>
                    </div>
                {/if}
            </div>
	    </div>
    </div>
</div>

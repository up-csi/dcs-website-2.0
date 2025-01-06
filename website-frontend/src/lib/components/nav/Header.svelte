<script lang="ts">
    import FacebookIcon from '$lib/assets/FacebookIcon.svelte';
    import XIcon from '$lib/assets/XIcon.svelte';
	export let assets;
</script>

<div class="bg-slate-50 h-14 md:h-16 items-center py-2">
    <div class="flex justify-between md:px-9 px-2">
        <div class="flex items-center my-auto">
            <img
                src={assets.favicon}
                alt="UP"
                class="max-w-xs rounded-full bg-gray-400 hidden md:block h-12 w-12 mr-1"
            />
            <img
                src={assets.favicon}
                alt="DCS"
                class="max-w-xs rounded-full bg-gray-400 h-10 w-10 mr-2 md:h-12 md:w-12 md:mr-3"
            />
            <div class="font-semibold text-[#004420] ">
                <h1 class="text-xs md:text-sm">University of the Philippines Diliman</h1>
                <h1 class="text-md md:text-lg -mt-1 md:-mt-2">Department of Computer Science</h1>
            </div>
        </div>
        <div class="flex items-center my-auto">
            <a href="https://web.facebook.com/upddcs?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" 
               class="hidden md:block h-7 pb-[2px] mr-3 text-gray-400 hover:text-[#004420] transition-colors duration-300">
                <FacebookIcon />
            </a>
            <a href="https://x.com/upcs" target="_blank" rel="noopener noreferrer" 
               class="hidden md:block h-5 text-gray-400 hover:text-[#004420] transition-colors duration-300">
                <XIcon />
            </a>
        </div>
    </div>
</div>

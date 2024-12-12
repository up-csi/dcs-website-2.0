<script>
    export let data;
</script>

<body class="bg-gray-100">
    {#if data.people_category}
        <div class="relative">
            <div 
                class="bg-cover bg-center h-[55vh] md:h-[65vh]" 
                style="background-image: linear-gradient(to top, #004420, transparent), url('{data.people_category.image}')">
            </div>

            <div class="absolute bottom-9 md:max-w-[60vw] px-4 md:px-32">
                <h1 class="font-bold text-3xl md:text-5xl">{data.people_category.title}</h1>
                <h4>{data.people_category.description}</h4>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-[90vw] md:max-w-[80vw] mx-auto my-8">    
            {#each data.people_category.people as { name, profile_img, position, lab }}
		        <a href="/people/{name}" class="max-w-xs">
                    <div class="bg-white shadow-xl rounded-lg py-3 px-3 flex flex-col h-full">
                        <div class="photo-wrapper p-2">
                            <img class="w-32 h-32 rounded-full mx-auto" src="{profile_img}" alt="Profile">
                        </div>
                        <div class="p-2">
                            <div class="text-center text-gray-400 text-xs font-semibold">
                                <p>{position}</p>
                            </div>
                            <h3 class="text-center text-xl text-gray-900 font-medium py-3">{name}</h3>
                            <div class="text-center text-gray-400 text-xs font-semibold">
                                <p>{lab}</p>
                            </div>
                        </div>
                    </div>
                </a>
	        {/each}
        </div>

    {:else}
        <p>People category not found</p>
    {/if}
</body>
<script>
    export let data;
</script>

<body class="bg-gray-100">
    {#if data.program}
        <div class="relative">
            <div 
                class="bg-cover bg-center h-[40vh] md:h-[50vh]" 
                style="background-image: linear-gradient(to top, #004420, transparent), url('{data.program.image}')">
            </div>

            <div class="absolute bottom-9">
                <h1 class="font-bold text-3xl px-4 md:px-32 md:text-5xl md:max-w-[60vw]">{data.program.title}</h1>
            </div>
        </div>

        <div class="text-[#01152B] text-base px-4 py-10 md:px-32">
            {@html data.program.description}

            <div class="max-w-6xl rounded-md overflow-hidden shadow-lg bg-white my-10">
                <div class="px-4 md:px-6 py-8">
                    <div class="font-bold text-xl mb-8">Curriculum</div>

                    <p class="text-gray-500 text-sm">
                        Core Courses
                    </p>
                    <p class="text-base">
                        {@html data.program.curriculum}
                    </p>
                    
                </div>
            </div>
        </div>
    {:else}
        <p>Program not found</p>
    {/if}
</body>
<script>
    import { page } from "$app/stores";
    import { derived } from "svelte/store";

    let academics = [
        { slug: "bs-cs", title: "Bachelor of Science in Computer Science", image: "https://placehold.co/600x400", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel ullamcorper nulla. Morbi nec urna ac tellus tempor blandit id id dui. Donec hendrerit sem a nibh lobortis placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut erat massa, luctus quis arcu non, posuere vulputate lacus. Nulla euismod quam eget dolor tristique, pulvinar egestas leo imperdiet. Curabitur erat augue, placerat non turpis non, posuere rutrum est. Nullam scelerisque quam et nisl blandit molestie. Vestibulum at velit id dui faucibus pretium. Cras aliquet ante at scelerisque eleifend.<br><br>Sed non odio scelerisque, iaculis ante ac, viverra mauris. Maecenas nibh elit, dignissim at felis sed, ullamcorper pretium enim. Duis at viverra dolor. Praesent vestibulum mollis malesuada. Fusce sit amet ante aliquet, pellentesque nibh eget, consequat magna. Nullam et ipsum non nulla mollis iaculis. Etiam non tempus risus.", curriculum: "" },
        { slug: "ms-cs", title: "Master of Science in Computer Science", image: "https://placehold.co/600x400", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel ullamcorper nulla. Morbi nec urna ac tellus tempor blandit id id dui. Donec hendrerit sem a nibh lobortis placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut erat massa, luctus quis arcu non, posuere vulputate lacus. Nulla euismod quam eget dolor tristique, pulvinar egestas leo imperdiet. Curabitur erat augue, placerat non turpis non, posuere rutrum est. Nullam scelerisque quam et nisl blandit molestie. Vestibulum at velit id dui faucibus pretium. Cras aliquet ante at scelerisque eleifend.<br><br>Sed non odio scelerisque, iaculis ante ac, viverra mauris. Maecenas nibh elit, dignissim at felis sed, ullamcorper pretium enim. Duis at viverra dolor. Praesent vestibulum mollis malesuada. Fusce sit amet ante aliquet, pellentesque nibh eget, consequat magna. Nullam et ipsum non nulla mollis iaculis. Etiam non tempus risus.", curriculum: "" },
        { slug: "ms-bioinformatics", title: "Master of Science in Bioinformatics", image: "https://placehold.co/600x400", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel ullamcorper nulla. Morbi nec urna ac tellus tempor blandit id id dui. Donec hendrerit sem a nibh lobortis placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut erat massa, luctus quis arcu non, posuere vulputate lacus. Nulla euismod quam eget dolor tristique, pulvinar egestas leo imperdiet. Curabitur erat augue, placerat non turpis non, posuere rutrum est. Nullam scelerisque quam et nisl blandit molestie. Vestibulum at velit id dui faucibus pretium. Cras aliquet ante at scelerisque eleifend.<br><br>Sed non odio scelerisque, iaculis ante ac, viverra mauris. Maecenas nibh elit, dignissim at felis sed, ullamcorper pretium enim. Duis at viverra dolor. Praesent vestibulum mollis malesuada. Fusce sit amet ante aliquet, pellentesque nibh eget, consequat magna. Nullam et ipsum non nulla mollis iaculis. Etiam non tempus risus.", curriculum: "" },
        { slug: "phd-cs", title: "Doctor of Philosophy in Computer Science", image: "https://placehold.co/600x400", description: "The program aims to develop computer scientists who are armed with methods, tools and techniques from both theoretical and systems aspects of computing. They should be able to formulate computing problems and develop new and innovative technology as novel solutions to address those problems. The graduates will gain expertise to independently contribute in Research and Development (R&D) on a specialized area of Computer Science. The program will prepare graduates for professional and/or research careers in industry, government or academe.", curriculum: "" },
    ];

    const currentProgram = derived(page, $page => {
        const slug = $page.params.slug;
        return academics.find(program => program.slug === slug);
    });
</script>

<body class="bg-gray-100">
    {#if $currentProgram}
        <div class="relative">
            <div 
                class="bg-cover bg-center h-[40vh]" 
                style="background-image: linear-gradient(to top, #004420, transparent), url('{$currentProgram.image}')">
            </div>

            <div class="absolute bottom-9">
                <h1 class="font-bold text-3xl px-4 md:px-32 md:text-5xl md:max-w-[60vw]">{$currentProgram.title}</h1>
            </div>
        </div>

        <div class="text-[#01152B] text-base px-4 py-10 md:px-32">
            {@html $currentProgram.description}

            <div class="max-w-6xl rounded-md overflow-hidden shadow-lg bg-white my-10">
                <div class="px-4 md:px-6 py-8">
                    <div class="font-bold text-xl mb-8">Curriculum</div>

                    <p class="text-gray-500 text-sm">
                        Core Courses
                    </p>
                    <p class="text-base">
                        insert curriculum table here {@html $currentProgram.curriculum}
                    </p>
                    
                </div>
            </div>
        </div>
    {:else}
        <p>Program not found</p>
    {/if}
</body>
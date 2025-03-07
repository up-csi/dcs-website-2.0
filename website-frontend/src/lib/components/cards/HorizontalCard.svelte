<script lang="ts">
    import { PUBLIC_APIURL } from '$env/static/public';
    import ChevronRight from "lucide-svelte/icons/chevron-right";

	export let logo_image: string = '';
	export let background_image: string = '';
	export let name: string = '';
	export let description: string = '';

    let height = `h-32`;
	$: if (description) {
		height = 'h-40';
	}

    let background =
		'background-image: linear-gradient(to right, #0D4824 -5%, #D1D8DD 70%)';
	$: if (background_image) {
		background = `background-image: linear-gradient(to top, #0D4824 -5%, transparent 70%), url('${PUBLIC_APIURL}/assets/${background_image}')`;
	}
</script>

<div class="card group relative h-auto w-full flex flex-col overflow-hidden">
	<div class="{height} bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-105" style={background}></div>

    <div class="absolute text-white h-full flex items-center px-5 {logo_image ? 'md:px-6' : 'md:px-11'}">
        {#if logo_image}
            <img
                class="h-28 w-28 mr-6 hidden md:block rounded-full object-cover"
                src="{PUBLIC_APIURL}/assets/{logo_image}"
                alt="logo"
            />
        {/if}

        <div class="max-w-lg">
            <p class="text-xl leading-tight md:text-2xl font-bold">{name}</p>
            {#if description}
                <p class="text-xs font-light mt-3">{description}</p>
            {:else}
                <p class="text-xs font-light mt-2 flex items-center gap-1">
                    View Curriculum
                    <ChevronRight class="w-3 h-3" />
                </p>
            {/if}
        </div>
    </div>
</div>

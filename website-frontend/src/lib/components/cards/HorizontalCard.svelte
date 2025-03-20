<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	export let logo_image: string = '';
	export let background_image: string = '';
	export let name: string = '';
	export let description: string = '';

	let height = `h-32`;
	$: if (description) {
		height = 'h-40';
	}

	let background =
		'background-image: linear-gradient(to right, hsl(var(--primary)) -5%, #D1D8DD 70%)';
	$: if (background_image) {
		background = `background-image: linear-gradient(to right, hsl(var(--primary)) -5%, transparent 70%), url('${PUBLIC_APIURL}/assets/${background_image}')`;
	}
</script>

<div class="card group relative flex h-auto w-full flex-col overflow-hidden">
	<div
		class="{height} bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-105"
		style={background}
	></div>

	<div
		class="absolute flex h-full items-center px-5 text-white {logo_image ? 'md:px-6' : 'md:px-11'}"
	>
		{#if logo_image}
			<img
				class="mr-6 hidden h-28 w-28 rounded-full object-cover md:block"
				src="{PUBLIC_APIURL}/assets/{logo_image}"
				alt="logo"
			/>
		{/if}

		<div class="max-w-lg">
			<p class="text-xl font-bold leading-tight md:text-2xl">{name}</p>
			{#if description}
				<p class="mt-3 text-xs font-light">{description}</p>
			{:else}
				<p class="mt-2 flex items-center gap-1 text-xs font-light">
					View Curriculum
					<ChevronRight class="h-3 w-3" />
				</p>
			{/if}
		</div>
	</div>
</div>

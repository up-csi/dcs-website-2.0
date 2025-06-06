<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	export let logo_image: string = '';
	export let name: string = '';
	export let description: string = '';

	let height = `h-32`;
	$: if (description) {
		height = 'h-40';
	}
</script>

<div class="card group relative flex h-auto w-full flex-col overflow-hidden">
	<div
		class="{height} bg-gradient-to-r from-[hsl(var(--primary))] from-[-5%] to-[#D1D8DD] to-[130%] bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-105 sm:to-[110%] lg:to-[90%] xl:to-[70%]"
	></div>

	<div
		class="absolute flex h-full items-center px-5 text-white {logo_image ? 'md:px-6' : 'md:px-11'}"
	>
		{#if logo_image}
			<img
				class="mr-6 hidden h-28 w-28 rounded-full object-cover md:block"
				src="{PUBLIC_APIURL}/assets/{logo_image}?fit=cover&width=360&height=360"
				alt="logo"
			/>
		{/if}

		<div class="flex max-w-[80vw] flex-col">
			<p class="text-2xl font-bold leading-tight">{name}</p>
			{#if description}
				<p class="mt-3 text-sm font-light">{description}</p>
			{:else}
				<p class="mt-2 flex items-center gap-1 text-sm font-light">
					View Curriculum
					<ChevronRight class="h-3 w-3" />
				</p>
			{/if}
		</div>
	</div>
</div>

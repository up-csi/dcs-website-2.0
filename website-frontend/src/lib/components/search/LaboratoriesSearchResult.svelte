<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Laboratory } from '$lib/models/laboratories';

	export let item: Laboratory;

	let general_banner_height: number;
</script>

<a href={`/research/labs/${item.slug}`}>
	<div
		class="flex flex-col items-center justify-start gap-2 border-b py-5 text-center sm:flex-row sm:text-start"
	>
		{#if item.logo}
			<div
				class="flex h-36 w-full flex-col items-center justify-center overflow-hidden rounded-lg p-2 shadow-none md:w-2/5"
				bind:clientHeight={general_banner_height}
			>
				{#if general_banner_height}
					<img
						src="{PUBLIC_APIURL}/assets/{item.logo}?height={general_banner_height}"
						alt={item.name}
						class="h-full w-full rounded-lg object-cover"
					/>
				{/if}
			</div>
		{/if}

		<div class="w-full">
			<p class="text-xl font-bold">{item.name}</p>
			{#if item.brief_description}
				<p class="line-clamp-2">{item.brief_description}</p>
			{/if}
		</div>
	</div>
</a>

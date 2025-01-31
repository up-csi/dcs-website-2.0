<script lang="ts">
	import { ScrollText } from 'lucide-svelte';
	import { PUBLIC_URL } from '$env/static/public';

	export let publication;
</script>

<div class="card relative flex flex-col rounded-none bg-transparent shadow-none">
	<div
		class="absolute bottom-0 w-full rounded-lg shadow-xl"
		style="height: calc(var(--card-height) * (8 / 9));"
	/>

	<div class="flex w-full grow justify-center *:rounded-lg">
		{#if publication.image}
			<img
				src="{PUBLIC_URL}/assets/{publication.image}"
				alt={publication.title}
				style="width: calc(var(--card-height) * (19 / 45));"
			/>
		{:else}
			<div
				class="flex h-full items-center justify-center bg-muted"
				style="width: calc(var(--card-height) * (19 / 45));"
			>
				<ScrollText class="h-20 w-20 bg-muted text-muted-foreground" />
			</div>
		{/if}
	</div>
	<div class="p-2">
		<p class="mx-2 my-4 line-clamp-4 text-center text-lg font-bold">{publication.title}</p>
		<div class="flex w-full justify-between *:text-sm">
			<p class="text-muted-foreground">{publication.authors[0]}</p>
			<p class="text-secondary">{new Date(publication.date_published).toLocaleDateString()}</p>
		</div>
	</div>
</div>

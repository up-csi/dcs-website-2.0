<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';

	export let image: string | null | undefined, name: string;
</script>

<div
	class="grid items-center justify-start gap-5 border-b py-2"
	style="grid-template-columns: 1fr 3fr;"
>
	<div
		class="flex h-36 w-full items-center justify-center overflow-hidden rounded-lg p-2 shadow-none sm:h-60 lg:h-96"
	>
		{#if image}
			<img
				src="{PUBLIC_APIURL}/assets/{image}"
				alt={name}
				class="max-h-full max-w-full rounded-lg"
			/>
		{/if}
	</div>

	<div class="w-full">
		<slot />
	</div>
</div>

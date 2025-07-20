<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import type { Person } from '$lib/models/people';

	export let item: Person;

	$: laboratory = item.affiliations
		? typeof item.affiliations[0] == 'object'
			? item.affiliations[0].laboratories_id &&
				typeof item.affiliations[0].laboratories_id == 'object'
				? item.affiliations[0].laboratories_id.name
				: ''
			: ''
		: '';

	let general_banner_height: number;
</script>

<a href={`/people/${item.username}`}>
	<div
		class="flex flex-col items-center justify-start gap-2 border-b py-5 text-center sm:flex-row sm:text-start"
	>
		{#if item.profile_image}
			<div
				class="flex h-36 w-full flex-col items-center justify-center overflow-hidden rounded-lg p-2 shadow-none md:w-2/5"
				bind:clientHeight={general_banner_height}
			>
				{#if general_banner_height}
					<img
						src="{PUBLIC_APIURL}/assets/{item.profile_image}?height={general_banner_height}"
						alt={`${item.first_name} ${item.last_name}'s profile picture`}
						class="h-full w-full rounded-lg object-cover"
					/>
				{/if}
			</div>
		{/if}

		<div class="w-full">
			<p class="text-xl font-bold">{`${item.first_name} ${item.last_name}`}</p>
			{#if item.position}
				<p class="line-clamp-2">
					{`${item.position} ${laboratory ? ` · ${laboratory}` : ``}`}
				</p>
			{/if}
		</div>
	</div>
</a>

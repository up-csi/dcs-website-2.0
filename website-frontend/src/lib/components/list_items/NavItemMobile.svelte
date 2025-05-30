<script lang="ts">
	import * as Accordion from '$lib/@shadcn-svelte/ui/accordion';
	import { mobileOpen } from '$lib/stores';

	export let href: string,
		to: string,
		dropdown: boolean = false;
</script>

<!-- Mobile NavItem -->
<div class="w-full py-2 lg:hidden">
	{#if dropdown}
		<Accordion.Root>
			<Accordion.Item value={to} class="border-none">
				<div class="flex items-center justify-start">
					<a
						{href}
						class="mr-5"
						on:click={() => {
							$mobileOpen = false;
						}}>{to}</a
					>
					<Accordion.Trigger class="py-0" />
				</div>
				<Accordion.Content>
					<slot />
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	{:else}
		<a
			{href}
			on:click={() => {
				$mobileOpen = false;
			}}>{to}</a
		>
	{/if}
</div>

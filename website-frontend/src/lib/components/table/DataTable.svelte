<script lang="ts">
	import * as Table from '$lib/@shadcn-svelte/ui/table';
	import { deslugify } from '$lib/utils';

	export let data: Array<object>;
</script>

{#if data.length !== 0}
	<Table.Root>
		<Table.Header>
			<Table.Row>
				{#each Object.keys(data[0]) as heading}
					<Table.Head>{deslugify(heading)}</Table.Head>
				{/each}
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.map((item) => Object.values(item)) as entries}
				<Table.Row>
					{#each entries as entry}
						{#if entry}
							<Table.Cell>{entry}</Table.Cell>
						{:else}
							<Table.Cell />
						{/if}
					{/each}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{:else}
	<br />
	Empty
	<br />
{/if}
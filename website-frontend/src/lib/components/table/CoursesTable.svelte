<script lang="ts">
	import * as Table from '$lib/@shadcn-svelte/ui/table';
	import { deslugify } from '$lib/utils';

	export let data: Array<object>;

	const hiddenColumns = ['user_created', 'date_created', 'user_updated', 'date_updated'];
</script>

{#if data.length !== 0}
	<div class="shadow-lg">
		<Table.Root class="overflow-hidden rounded-lg">
			<Table.Header class="bg-gray-100">
				<Table.Row>
					{#each Object.keys(data[0]).filter((col) => !hiddenColumns.includes(col)) as heading}
						<Table.Head class="bg-gray-100 px-4 py-2 text-left text-sm font-semibold text-gray-700">
							{deslugify(heading)}
						</Table.Head>
					{/each}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data as item}
					<Table.Row>
						{#each Object.entries(item)
							.filter(([key]) => !hiddenColumns.includes(key))
							.map((entry) => entry[1]) as value}
							<Table.Cell class="bg-white text-gray-600">
								{value}
							</Table.Cell>
						{/each}
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{:else}
	<br />
	Empty
	<br />
{/if}

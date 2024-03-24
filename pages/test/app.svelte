<script>
	import { DataTable, Dropdown } from "carbon-components-svelte";
	let data = [
		{
			id: "1",
			message: "A",
			action: "0",
		},
		{
			id: "2",
			message: "B",
			action: "1",
		}
	];
	let hdrs = [
		{ key: "id", value: "ID" },
		{ key: "message", value: "Message" },
		{ key: "action", value: "Action" },
	]
	
	function updateData(e, r, c) {
		let i = data.findIndex( (e) => e.id == r.row.id)
		data[i][c.cell.key] = e.srcElement.textContent
	}
	
	function selection(e, r, c) {
		let i = data.findIndex( (e) => e.id == r.row.id)
 		data[i][c.cell.key] = e.detail.selectedId
	}
</script>

<DataTable bind:rows={data} headers={hdrs}>
	<svelte:fragment slot="cell" let:cell let:row>
		{#if cell.key === "action"}
			<Dropdown
					type="inline"
					selectedId={row.action}
					on:select={ (e) => selection(e, {row}, {cell}) }
					items={[
								{ id: "0", text: "Choose 1" },
								{ id: "1", text: "Choose 2" },
					]}
			/>
		{:else if cell.key === "message"}
			<div spellcheck=false contenteditable="true" on:blur={ (e) => updateData(e, {row}, {cell}) }>
				{#if cell.value.length > 0}	 
					{cell.value}
				{:else}
				  ✏️
				{/if}
			</div>
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>
<pre>
{JSON.stringify(data, null, 2)}
</pre>